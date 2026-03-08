const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { updateLocation, getLiveLocation } = require('../controllers/technicianController');

// Technician updates their own location
router.put('/location-update', protect, authorize('Technician'), updateLocation);

// Customer fetches tracking location based on booking constraint
router.get('/live-location/:bookingId', protect, authorize('Customer'), getLiveLocation);

module.exports = router;
