const express = require('express');
const router = express.Router();
const studentAttendanceService = require('../services/student_attendence_serives');

router.post('/mark-attendance', async (req, res) => {
  try {
    const { studentID, dayId, timeslotID, status } = req.body;
    const attendance = await studentAttendanceService.markAttendance(
      studentID,
      dayId,
      timeslotID,
      status,
    );
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/attendance/:studentID', async (req, res) => {
  try {
    const { studentID } = req.params;
    const attendance = await studentAttendanceService.getAttendanceByStudent(studentID);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/attendance/:dayId/:timeslotID', async (req, res) => {
  try {
    const { dayId, timeslotID } = req.params;
    const attendance = await studentAttendanceService.getAttendanceByDayAndTimeslot(dayId, timeslotID);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;