const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createBooking, getBooking, getBookingHistory, updateBookingStatus, cancelBooking } = require('../controllers/bookingController');

router.post('/create', protect, createBooking);
router.get('/history', protect, getBookingHistory);
router.get('/:id', protect, getBooking);
router.put('/update-status', protect, updateBookingStatus);
router.put('/cancel', protect, cancelBooking);

module.exports = router;
