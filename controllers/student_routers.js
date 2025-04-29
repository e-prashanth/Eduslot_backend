const express = require('express');
const router = express.Router();
const StudentServices = require('../services/student_services');

// Add a new student
router.post('/add-student', StudentServices.addStudent);

// Add multiple students from CSV
router.post('/add-students-from-csv', StudentServices.addStudentsFromCSV);

// Get all students
router.get('/get-all-students', StudentServices.getAllStudents);

// Get a student by roll number
router.get('/get-student/:rollNumber', StudentServices.getStudentByRollNumber);

// Delete a student by roll number
router.delete('/delete-student/:rollNumber', StudentServices.deleteStudent);

// Update a student by roll number
router.put('/update-student/:rollNumber', StudentServices.updateStudent);

// Search for a student by fingerprint data
router.get('/search/:serialNumber', StudentServices.Search);

module.exports = router;