const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createOrder, verifyPayment, refundPayment, generateInvoice } = require('../controllers/paymentController');

// All payment routes require authentication
router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);

// Typically only authorized admins can issue refunds
router.post('/refund', protect, authorize('Admin'), refundPayment);

router.get('/invoice/:bookingId', protect, generateInvoice);

module.exports = router;
