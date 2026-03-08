const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true });

ReviewSchema.index({ technician: 1 });

module.exports = mongoose.model('Review', ReviewSchema);
