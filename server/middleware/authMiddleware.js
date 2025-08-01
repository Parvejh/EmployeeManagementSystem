const jwt = require('jsonwebtoken')

exports.requireAuth = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.redirect('/login');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user  = decoded;
        next();
    }catch(error){
        console.log("Error in require auth")
        return res.redirect('/login')
    }
}

exports.isAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.send("Access Denied: Admins only");
    }
    next();
}

exports.isEmployee = (req,res,next)=>{
    if(req.user.role !== 'employee'){
        return res.send("Access Denied: Employees only");
    }
    next();
}