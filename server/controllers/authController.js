const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getLogin = (req,res)=>{
    res.render('login');
}

exports.postLogin = async (req,res)=>{
    // Destructure & get email, password from req.body
    const {email, password} = req.body;
    // find the user
    const user = await User.findOne({email:email});
    // Is the user is not found OR the password of the user does not match
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.send('Invalid Credentials');
    }
    // If both conditions are OK
    // generate a json token
    const token = jwt.sign(
        {id:user._id, role:user.role},
        process.env.JWT_SECRET
    );
    res.cookie('token',token,{httpOnly:true});

    res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')

}

exports.getRegister = (req,res)=>{
    res.render('register');
}

exports.postRegister = async (req,res)=>{
    const {name,email,password} = req.body;

    const hash = await bcrypt.hash(password,10);

    await User.create({name,email,password:hash});

    res.redirect('/login');
}

exports.logout = (req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
}