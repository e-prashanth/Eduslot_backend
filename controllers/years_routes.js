const express = require('express');
const router = express.Router();
const yearService = require('../services/years_services');

router.post('/add-year', yearService.addYear);
router.get('/get-all-years', yearService.getAllYears);
router.get('/get-years-by-deptId',yearService.getYearsByDeptId);
router.delete('/delete-year/:yearId', yearService.deleteYear);
router.put('/update-year/:yearId', yearService.updateYear);

module.exports = router;
