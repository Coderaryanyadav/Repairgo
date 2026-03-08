const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    deviceBrand: { type: String, required: true },
    deviceModel: { type: String, required: true },
    issue: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Finding_Technician', 'Accepted', 'En_Route', 'In_Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [longitude, latitude] of the repair job
    },
    cost: { type: Number, required: true }
}, { timestamps: true });

BookingSchema.index({ location: "2dsphere" });
BookingSchema.index({ user: 1 });
BookingSchema.index({ technician: 1 });
BookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
