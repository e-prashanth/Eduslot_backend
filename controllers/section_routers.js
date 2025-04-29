const express = require('express');
const router = express.Router();
const SectionServices = require('../services/section_services');

router.post('/add-section', SectionServices.addSection);
router.get('/get-sections-by-deptId-yearId', SectionServices.getSectionByDeptIdAndYearId);
router.delete('/delete-section/:departmentId', SectionServices.deleteSection);
router.put('/update-department/:departmentId', SectionServices.updateSection);

module.exports = router;
