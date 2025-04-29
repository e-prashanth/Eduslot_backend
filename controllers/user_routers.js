const express = require('express');
const router = express.Router();
const userService = require('../services/user_services');
const multer = require('multer');
const verifyToken = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' });

    

//Route to user login
router.post('/user-login', userService.userLogin);

//Route to change user password
router.post('/user-change-password', userService.userChangePassword);

//Route to forgot password
router.post('/user-forgot-password', userService.userForgotPassword);

//Route to get user details
router.get('/get-user-details' , userService.getUserDetails);

//Route to get all teachers
router.get('/get-all-teachers', userService.getAllTeachers);

//Route to update user details
router.put('/update-user-details', verifyToken, upload.single('file'), userService.updateUserDetails);

//Route to delete user details
router.delete('/delete-user-details', verifyToken, userService.deleteUserDetails);

//Route to user logout
router.post('/user-logout', verifyToken, userService.userLogout);

module.exports = router;


