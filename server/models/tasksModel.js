const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    dueDate:Date,
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type:String,
        enum:['assigned','submitted','verified','sent_back'],
        default:'assigned'
    },
    submission:{
        submittedAt:Date,
        content:String,
        fileUrl:String,
        remarksFromAdmin:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Task', taskSchema);