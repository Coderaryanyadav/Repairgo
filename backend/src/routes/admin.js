const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, authorize('Admin'), (req, res) => {
    res.json({ success: true, message: 'Admin Dashboard Data' });
});

module.exports = router;
