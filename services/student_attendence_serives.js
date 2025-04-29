// services/studentAttendanceService.js
const StudentAttendance = require('../models/student_attendence');

// Mark attendance for a student
const markAttendance = async (studentID, dayId, timeslotID, status) => {
    
  try {
    const attendance = new StudentAttendance({
      studentID,
      dayId,
      timeslotID,
      status,
    });
    await attendance.save();
    return attendance;
  } catch (error) {
    throw new Error(`Error marking attendance: ${error.message}`);
  }
};

// Get attendance for a student by studentID
const getAttendanceByStudent = async (studentID) => {
  try {
    const attendance = await StudentAttendance.find({ studentID })
      .populate('dayId')
      .populate('timeslotID');
    return attendance;
  } catch (error) {
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
};

// Get attendance for a specific day and timeslot
const getAttendanceByDayAndTimeslot = async (dayId, timeslotID) => {
  try {
    const attendance = await StudentAttendance.find({ dayId, timeslotID })
      .populate('studentID')
      .populate('dayId')
      .populate('timeslotID');
    return attendance;
  } catch (error) {
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
};

module.exports = {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByDayAndTimeslot,
};