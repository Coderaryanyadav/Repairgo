const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Note: In real app, we would use Firebase Admin SDK here to verify OTP.

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.sendOtp = async (req, res) => {
    // Pseudocode for sending OTP via Firebase or Twilio
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
};

exports.verifyOtp = async (req, res) => {
    // Verification logic
    res.status(200).json({ success: true, message: 'OTP verified' });
};

exports.login = async (req, res) => {
    try {
        const { phone } = req.body;
        let user = await User.findOne({ phone });

        // Auto-register if not found (standard for OTP mobile apps)
        if (!user) {
            user = await User.create({ phone, name: 'Customer' });
        }

        const token = generateToken(user._id, 'Customer');
        res.status(200).json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
