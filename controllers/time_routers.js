const express = require('express');
const router = express.Router();
const timeServices = require('../services/time_services');

router.post('/add-time', timeServices.addTime);
router.get('/get-all-times', timeServices.getAllTimes);
router.delete('/delete-time/:timeID', timeServices.deleteTime);
router.put('/update-time/:oldtimeID',timeServices.UpdateTime);
router.get('/get-time-by-year-day/:yearId/:dayId',timeServices.getTimeByYearIdAndTimeId);
router.get('/get-time-by-all/:yearId/:dayId/:sectionId',timeServices.getTimeByYearIdAndDayIdAndSectionID);
module.exports = router;
