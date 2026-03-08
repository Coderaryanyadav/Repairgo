const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const paymentService = require('../../services/paymentService');

exports.createOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

        // Ensure the booking belongs to the current user (if user, not admin)
        if (String(booking.user) !== String(req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized for this booking' });
        }

        // Amount comes from the booking cost (add GST logic here if needed)
        const totalAmount = booking.cost + (booking.cost * 0.18); // Example GST

        const order = await paymentService.createOrder(bookingId, totalAmount);

        // Create initial Pending payment record
        const paymentRecord = await Payment.create({
            booking: bookingId,
            user: req.user.id,
            technician: booking.technician,
            amount: totalAmount,
            provider: 'Razorpay',
            orderId: order.id,
            status: 'Pending'
        });

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentRecordId: paymentRecord._id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        const isAuthentic = paymentService.verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (isAuthentic) {
            // Update Payment Record
            await Payment.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    status: 'Success',
                    transactionId: razorpay_payment_id
                }
            );

            // Update Booking status if needed (e.g., handling prepay vs postpay)
            // Usually, repair platforms are post-pay (pay after complete), but this handles both.

            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            await Payment.findOneAndUpdate({ orderId: razorpay_order_id }, { status: 'Failed' });
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.refundPayment = async (req, res) => {
    try {
        const { paymentId, amount } = req.body; // Internal Payment record ID

        const paymentRecord = await Payment.findById(paymentId);
        if (!paymentRecord || paymentRecord.status !== 'Success') {
            return res.status(400).json({ success: false, message: 'Invalid payment or not eligible for refund' });
        }

        const refund = await paymentService.issueRefund(paymentRecord.transactionId, amount * 100); // amt in paise

        paymentRecord.status = 'Refunded';
        await paymentRecord.save();

        res.status(200).json({ success: true, refund });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.generateInvoice = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const invoice = await paymentService.generateInvoice(bookingId);

        res.status(200).json({ success: true, invoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
