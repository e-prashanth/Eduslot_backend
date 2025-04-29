const express = require('express');
const router = express.Router();
const labService = require('../services/labs_services');

router.post('/add-lab', labService.addLab);
router.get('/get-all-labs', labService.getAllLabs);
router.delete('/delete-lab/:labId', labService.deleteLab);
router.put('/update-lab/:labId', labService.updateLab);
router.post('/get-Available-labs', labService.getAvailableLabs);

module.exports = router;
