const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipientModel: { type: String, enum: ['User', 'Technician'], required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'recipientModel' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    data: { type: mongoose.Schema.Types.Mixed } // For deep linking or extra payload
}, { timestamps: true });

NotificationSchema.index({ recipientId: 1, isRead: 1 });

module.exports = mongoose.model('Notification', NotificationSchema);
