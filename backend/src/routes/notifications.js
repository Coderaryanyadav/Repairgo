const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { updateFCMToken } = require('../controllers/notificationController');

// Synchronize token on app load
router.put('/sync-token', protect, updateFCMToken);

module.exports = router;
