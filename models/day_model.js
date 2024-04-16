const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  dayName: { type: String, required: true },
  dayId: { type: Number, required: true, unique: true },
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
