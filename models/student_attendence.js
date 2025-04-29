// models/StudentAttendance.js
const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  dayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day', // Reference to the Day model
    required: true,
  },
  timeslotID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'time', // Reference to the Timeslot model
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'], // Only allow 'present' or 'absent'
    required: true,
  },
}, { timestamps: true }); // Add createdAt and updatedAt fields

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);