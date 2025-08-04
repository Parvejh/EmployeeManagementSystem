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
        assignedBy:req.user.id
    })

    res.redirect('/admin/dashboard');
}

// View all assigned Task
exports.getAllTasks = async (req,res)=>{
    const tasks = await Task.find().
    populate('assignedTo','name').
    populate('assignedBy','name');

    res.render('adminTasks',{tasks})
}

// View submitted tasks only
exports.getSubmittedTasks = async (req,res)=>{
    const tasks = await Task.find({status:'submitted'})
    .populate('assignedTo','name')

    res.render('verifyTasks', {tasks})
}

// Handle verification or rejection
exports.postReviewTasks = async (req,res)=>{
    const {action,remarks} = req.body;

    const update = {status:action};
    if(action === "sent_back"){
        update.submission = {...update.submission , remarksFromAdmin: remarks}
    }

    await Task.findByIdAndUpdate(req.params.taskId,update)

    res.redirect('/admin/tasks/verify');
}