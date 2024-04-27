const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true,index:true, unique: true ,sparse:true} // Making departmentName unique
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
