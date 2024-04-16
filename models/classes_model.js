const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  classNumber: { type: Number, required: true },
  classId: { type: Number, required: true, unique: true },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;