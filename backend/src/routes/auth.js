const express = require('express');
const router = express.Router();
const { login, sendOtp, verifyOtp } = require('../controllers/authController');

// Using Firebase Auth for OTP validation as per spec
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Standard Login (Issue JWT)
router.post('/login', login);

module.exports = router;
