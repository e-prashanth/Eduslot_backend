const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true },
  dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', default: null },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null },
  timeId:  { type: mongoose.Schema.Types.ObjectId, ref: 'time', default: null },
  date: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
