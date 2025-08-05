const User = require('../models/userModel');
const Task = require('../models/tasksModel');

// Show Task Assigment page
exports.getAssignTask = async (req,res)=>{
    const employees = await User.find({role:"employee"});
    res.render('assignTask',{employees});
}

// Handle Task creation
exports.postAssignTask = async (req,res)=>{
    const {title,description,dueDate,assignedTo} = req.body;
    await Task.create({
        title,
        description,
        dueDate,
        assignedTo,
        assignedBy:req.user.userId
    })

    res.redirect('/admin/dashboard');
}

// View all assigned Task
// exports.getAllTasks = async (req,res)=>{
//     const tasks = await Task.find().
//     populate('assignedTo','name').
//     populate('assignedBy','name');

//     res.render('adminTasks',{tasks})
// }

// View submitted tasks only
// exports.getSubmittedTasks = async (req,res)=>{
//     const tasks = await Task.find({status:'submitted'})
//     .populate('assignedTo','name')

//     res.render('verifyTasks', {tasks})
// }

// Handle verification or rejection
exports.postReviewTasks = async (req,res)=>{
    // find the task
    const task = await Task.findById(req.params.taskId)
    const {action,remarks} = req.body;
    
    if(!task){
        console.log("task not found inside post review tasks ")
        return res.redirect('/admin/dashboard')
    }
    task.action = action;
    task.remarksFromAdmin = remarks;

    if(req.file){
        task.submission.adminFeedbackFile = req.file.path;
    }

    if(task.action === 'verified'){
        await Task.findByIdAndUpdate(req.params.taskId, {status:'verified'})
        task.submission = {...(task.submission ||{}), remarksFromAdmin: remarks}
    }
    // const update = {status:action};
    if(task.action === "sent_back"){
        await Task.findByIdAndUpdate(req.params.taskId, {status:'sent_back'})
        task.submission = {...(task.submission ||{}), remarksFromAdmin: remarks}
    }

    // await Task.findByIdAndUpdate(req.params.taskId,update)
    await task.save();
    res.redirect('/admin/dashboard');
}


// Get, all tasks, task submissions on dashboard

exports.getAdminDashboard = async (req,res)=>{
    try{
        const userName = await User.findById(req.user.userId)
        // get all the tasks & display them
        const tasks = await Task.find({assignedBy:req.user.userId})
        .populate('assignedTo','name')
        .populate('assignedBy', 'name')
        .sort({createdAt:-1})

        // Pagination for submitted tasks
        const page =  parseInt(req.query.page ) || 1;
        const limit = 5;
        const skip = (page -1 ) * limit;
        const total = await Task.countDocuments({status:'submitted',assignedBy:req.user.userId})

        // get all the submitted tasks
        const submittedTasks = await Task.find({status:'submitted',assignedBy:req.user.userId})
        .populate('assignedTo','name')
        .skip(skip)
        .limit(limit)

        // render the dashboard with all & submitted tasks
        return res.render('adminDashboard',{name:userName.name,tasks,submittedTasks,currentPage:page, totalPages:Math.ceil(total/limit)});
    }catch(error){
        res.status(500).send("Admin Dashboard error : ",error);
    }
}