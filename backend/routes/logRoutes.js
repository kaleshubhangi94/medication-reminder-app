const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const verifyJWT = require('../middleware/verifyJWT');  // JWT middleware

// Log a medicine as taken or not
router.post('/', verifyJWT, logController.logAcknowledgment);

// Get acknowledgment logs (for Super Admin)
router.get('/', verifyJWT, logController.getAcknowledgmentLogs);

module.exports = router;
