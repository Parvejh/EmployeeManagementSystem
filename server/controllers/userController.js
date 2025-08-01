const User = require('../models/userModel');

module.exports.signUp = async (req,res)=>{
    return res.render('signUp')
}

module.exports.signIn = async (req,res)=>{
    try{
        // find the user
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.render(
                'User',
                {
                    user:user
                }
            )
        }
    }catch(err){
        console.log("Error in opening user logged in page : ",err)
        return res.redirect('/')
    }
    return res.send("<h1>User is logged in </h1>")
}

module.exports.createUser = async (req,res)=>{
    try{
        // find if the user already exist
        const user = await User.findOne({email:req.body.email})

        if(!user){
            User.create(req.body);
            console.log(req.body.email ," is created")
        }
        else{
            console.log("User already exist");
        }
        return res.redirect('/');
    }
    catch(err){
        console.log("Error in creating new User : ", err);
        return res.redirect('/user/create');
    }
}
module.exports.createSession = async (req,res)=>{
    console.log("Inside create session with req: ",req.body);
    return res.redirect('/');
}