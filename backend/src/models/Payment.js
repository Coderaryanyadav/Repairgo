const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
    amount: { type: Number, required: true },
    provider: { type: String, default: 'Razorpay' },
    transactionId: { type: String }, // e.g. Razorpay Payment ID
    orderId: { type: String }, // e.g. Razorpay Order ID
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Failed', 'Refunded'],
        default: 'Pending'
    }
}, { timestamps: true });

PaymentSchema.index({ booking: 1 });
PaymentSchema.index({ user: 1 });

module.exports = mongoose.model('Payment', PaymentSchema);
