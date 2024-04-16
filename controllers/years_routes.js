const express = require('express');
const router = express.Router();
const yearService = require('../services/years_services');

router.post('/add-year', yearService.addYear);
router.get('/get-all-years', yearService.getAllYears);
router.delete('/delete-year/:yearId', yearService.deleteYear);
router.put('/update-year/:oldYearId', yearService.updateYear);

module.exports = router;
