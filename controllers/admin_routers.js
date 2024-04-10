const express = require('express');
const router = express.Router();
const adminService = require('../services/admin_services');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const verifyToken = require('../middleware/authMiddleware');


  
  
//Route to create user
router.post('/create-user', verifyToken, /* upload.single('image'), */ adminService.createUser);



module.exports = router;


