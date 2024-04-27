const express = require('express');
const router = express.Router();
const dayService = require('../services/day_services');

router.post('/add-day', dayService.addDay);
router.get('/get-all-days', dayService.getAllDays);
router.delete('/delete-day/:dayId', dayService.deleteDay);
router.put('/update-day/:dayId', dayService.updateDay);

module.exports = router;
