const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/create', userController.signUp);

router.post('/register',userController.createUser);
router.post('/create', userController.signIn);
// router.post('/create', userController.createSession);

module.exports = router