const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const verifyJWT = require('../middleware/verifyJWT');  // JWT middleware

// Add a new medicine schedule
router.post('/', verifyJWT, medicineController.addMedicineSchedule);

// Get all medicine schedules for the user
router.get('/', verifyJWT, medicineController.getMedicineSchedules);

// Update a medicine schedule
router.put('/:id', verifyJWT, medicineController.updateMedicineSchedule);

// Delete a medicine schedule
router.delete('/:id', verifyJWT, medicineController.deleteMedicineSchedule);
router.post('/acknowledge', verifyJWT, medicineController.acknowledgeMedicine);

module.exports = router;
