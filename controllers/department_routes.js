const express = require('express');
const router = express.Router();
const departmentService = require('../services/department_services');
const verifyToken = require('../middleware/authMiddleware');

router.post('/add-department', departmentService.addDepartment);
router.get('/get-all-departments', departmentService.getAllDepartments);
router.delete('/delete-department/:departmentId', departmentService.deleteDepartment);
router.put('/update-department/:departmentId', departmentService.updateDepartment);

module.exports = router;
