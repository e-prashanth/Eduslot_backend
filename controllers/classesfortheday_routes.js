const express = require('express');
const router = express.Router();
const classesForDayService = require('../services/classesfortheday_services');

router.post('/add-classes-for-day', classesForDayService.addClassesForDay);
router.get('/get-all-classes-for-day', classesForDayService.getAllClassesForDay);
router.delete('/delete-classes-for-day/:classForDayId', classesForDayService.deleteClassesForDay);
router.put('/update-classes-for-day/:ClassForDayId', classesForDayService.updateClassesForDay);
router.get('/get-classes-for-day/:timeslot',classesForDayService.getClassesForDay);

module.exports = router;
