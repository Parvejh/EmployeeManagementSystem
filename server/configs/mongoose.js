const mongoose = require('mongoose');

// connect the mongoose
mongoose.connect('mongodb://127.0.0.1:27017/EmployeeManagementSystemDB');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"MongoDB error : "));
db.once('open',()=>{
    console.log("Connection to MongoDB successfull");
})


module.exports = db;