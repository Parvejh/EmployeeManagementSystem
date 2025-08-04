const jwt = require('jsonwebtoken')

exports.redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(); // Not logged in — allow to see /login
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If valid token, redirect based on role
        if (decoded.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else if (decoded.role === 'employee') {
            return res.redirect('/employee/dashboard');
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        return next(); // Token invalid — allow access to /login
    }
};


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