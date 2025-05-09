const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  sectionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  dayName: { type: String, required: true },
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
