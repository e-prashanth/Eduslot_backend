const express = require('express');
const router = express.Router();
const classService = require('../services/classes_services');

router.post('/add-class', classService.addClass);
router.get('/get-all-classes', classService.getAllClasses);
router.delete('/delete-class/:classId', classService.deleteClass);
router.put('/update-class/:classId', classService.updateClass);
router.post('/get-Available-Classes',classService.getAvailableClasses);

module.exports = router;

