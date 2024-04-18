const express = require('express');
const router = express.Router();
const adminService = require('../services/admin_services');
const multer = require('multer');

// Configure Multer to save uploaded files with their original filename and extension
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Use the original filename provided by the user
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route to create user
router.post('/create-user', upload.single('image'), adminService.createUser);

module.exports = router;
