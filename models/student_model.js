const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the schema
const studentSchema = new mongoose.Schema({
    RollNumber: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    SerialNumber: { type: String, required: true }, 
    sectionId: { type: String, required: true },
    yearId: { type: String, required: true },
    departmentId: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;