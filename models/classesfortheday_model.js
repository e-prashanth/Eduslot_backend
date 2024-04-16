const mongoose = require('mongoose');

const classesForDaySchema = new mongoose.Schema({
  dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
  time: { type: String, required: true },
  className: { type: String, required: true },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', default: null },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null },
  classForDayId: { type: Number, required: true, unique: true },
});

const ClassesForDay = mongoose.model('ClassesForTheDay', classesForDaySchema);

module.exports = ClassesForDay;
