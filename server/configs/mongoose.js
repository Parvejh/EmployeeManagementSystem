const mongoose = require('mongoose');

// connect the mongoose
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"MongoDB error : "));
db.once('open',()=>{
    console.log("Connection to MongoDB successfull");
})


module.exports = db;
