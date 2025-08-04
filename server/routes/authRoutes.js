const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');


// Login , Register
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login');
});
router.post('/login',authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register',authController.postRegister);

// Logout
router.get('/logout',authController.logout);

module.exports = router;