const express = require('express');
const router = express.Router();
const departmentService = require('../services/department_services');
const verifyToken = require('../middleware/authMiddleware');

router.post('/add-department', departmentService.addDepartment);
router.get('/get-all-departments', departmentService.getAllDepartments);
router.delete('/delete-department/:departmentName', departmentService.deleteDepartment);
router.put('/update-department/:oldDepartmentName', departmentService.updateDepartment);

module.exports = router;
