const express = require('express');
const router = express.Router();
const {requireAuth, isAdmin, isEmployee} = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/multer')
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

// Admin Task Routes
router.get('/admin/tasks/assign',
    requireAuth,
    isAdmin,
    adminController.getAssignTask
)

router.post('/admin/tasks/assign',
    requireAuth,
    isAdmin,
    adminController.postAssignTask
)

router.get('/admin/tasks',
    requireAuth,
    isAdmin,
    adminController.getAllTasks
)

router.get('/admin/tasks/verify',
    requireAuth,
    isAdmin,
    adminController.getSubmittedTasks
)

router.post('/admin/tasks/:taskid/review',
    requireAuth,
    isAdmin,
    adminController.postReviewTasks
)

// Employee view tasks
router.get('/employee/tasks',
    requireAuth,
    isEmployee,
    employeeController.getEmployeeTasks
)

router.get('/employee/tasks/:taskId/submit',
    requireAuth,
    isEmployee,
    employeeController.getSubmitTask
)

router.post('/employee/tasks/:taskId/submit',
    requireAuth,
    isEmployee,
    upload.single('file'),
    employeeController.postSubmitTask
)

module.exports = router;