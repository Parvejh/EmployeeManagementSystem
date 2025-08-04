const Task  = require('../models/tasksModel');
const multer = require('multer')
const path = require('path');

// List all tasks assigned to the logged-in employee
exports.getEmployeeTasks = async (req,res)=>{
    const tasks = await Task.find({assignedTo:req.user.userId});
    res.render('employeeTasks',{tasks});
}

// Show Task submission form 
exports.getSubmitTask = async (req,res)=>{
    const task = await Task.findById(req.params.taskId);
    res.render('submitTask',{task});
}

// Handle Submission ( with optional file)
exports.postSubmitTask = async (req,res)=>{
    const { content } = req.body;
    await Task.findByIdAndUpdate(req.params.taskId,{
        status:'submitted',
        submission:{
            submittedAt : new Date(),
            content,
            fileUrl: req.file ? '/uploads/' + req.file.filename : " " ,
        }
    })

    res.redirect('/employee/dashboard');
}

// Employee Dashboard
exports.getEmployeeDashboard = async (req,res)=>{
    try{
        const tasks = await Task.find({assignedTo:req.user.userId});    

        
        res.render('employeeDashboard', {name:req.user.name, tasks})
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}