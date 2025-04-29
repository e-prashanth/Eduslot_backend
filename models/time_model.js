const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  dayId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
  sectionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  timeSlot: { type: String, required: true },
});

const time = mongoose.model('time', timeSchema);

module.exports = time;
