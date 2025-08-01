const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const db = require('./configs/mongoose')

app.use(express.urlencoded({extended:true})); //Handles data submitted via HTML forms
app.use(express.json());    //This is used to help in parsing JSON request bodies
app.use(cookieParser())     //Helps in reading cookies sent by the client

// set the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

// Routes
const authRoutes = require('./routes/authRoutes')
app.use('/',authRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})