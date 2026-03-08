wconst User = require('../models/User');
const Technician = require('../models/Technician');

// Add field to User and Technician models programmatically or expect during registration login
// To update Token when app launches
exports.updateFCMToken = async (req, res) => {
    try {
        const { fcmToken, model } = req.body; // model = 'User' or 'Technician'

        if (model === 'User') {
            await User.findByIdAndUpdate(req.user.id, { $set: { fcmToken } });
        } else if (model === 'Technician') {
            await Technician.findByIdAndUpdate(req.user.id, { $set: { fcmToken } });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid model type' });
        }

        res.status(200).json({ success: true, message: 'FCM Token updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
