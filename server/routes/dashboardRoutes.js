const express = require('express');
const router = express.Router();
const {requireAuth, isAdmin, isEmployee} = require('../middleware/authMiddleware');

//Admin Dashboard
router.get('/admin/dashboard', 
    requireAuth, 
    isAdmin,
    (req,res)=>{
        res.render('adminDashboard',{name:req.user.id});
    }
)

//Employee Dashboard
router.get('/employee/dashboard',
    requireAuth,
    isEmployee,
    (req,res)=>{
        res.render('employeeDashboard',{name:req.user.id})
    }
)

module.exports = router;