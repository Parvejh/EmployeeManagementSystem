const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getLogin = (req,res)=>{
    res.render('login');
}

exports.postLogin = async (req,res)=>{
    // Destructure & get email, password from req.body
    const {email, password} = req.body;
    try{
        // find the user
        const user = await User.findOne({email});
        // Is the user is not found OR the password of the user does not match
        if(!user){
            return res.send('User not found');
        }
        // If the password is not correct
        const matched = await bcrypt.compare(password,user.password)
        if(!matched) return res.send("Invalid password");
        // If both conditions are OK
        // generate a json token
        const token = jwt.sign(
            {userId:user._id, role:user.role},
            process.env.JWT_SECRET
        );
        res.cookie('token',token,{httpOnly:true});

        // redirect by Role
        res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
    }catch(err){
        console.log(err);
        return res.status(500).send("Error logging in ");
    }
}

exports.getRegister = (req,res)=>{
    res.render('register');
}

exports.postRegister = async (req,res)=>{


    const {name,email,password,role,department} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.send(" User already exist");

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            department
        })

        res.redirect('/login');
    }
    catch(err){
        res.status(500).send('Error registering user');
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
}