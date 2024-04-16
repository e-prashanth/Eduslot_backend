// department_model.js
const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentId: { type: Number, unique: true },
  departmentName: String,
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
