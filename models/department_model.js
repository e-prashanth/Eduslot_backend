// department_model.js
const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentName: String,
  labsCount:Number,
  classesCount:Number
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
