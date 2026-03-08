require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../src/models/Payment');
const Booking = require('../src/models/Booking');

// Initialize Razorpay Instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (bookingId, amount) => {
    const options = {
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${bookingId}`,
        payment_capture: 1, // Auto capture
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        throw new Error(`Failed to create Razorpay Order: ${error.message}`);
    }
};

exports.verifySignature = (orderId, paymentId, signature) => {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    return expectedSignature === signature;
};

exports.issueRefund = async (paymentId, amountPaise) => {
    try {
        const refund = await razorpayInstance.payments.refund(paymentId, {
            amount: amountPaise,
            speed: "optimum" // normal or optimum
        });
        return refund;
    } catch (error) {
        throw new Error(`Refund failed: ${error.message}`);
    }
};

exports.generateInvoice = async (bookingId) => {
    // In production, you would generate a PDF, store it in S3, and return the URL
    // Here we generate a structured JSON representation of an invoice
    const booking = await Booking.findById(bookingId).populate('user service technician');
    if (!booking) throw new Error("Booking not found");
    const payment = await Payment.findOne({ booking: bookingId, status: 'Success' });
    if (!payment) throw new Error("Successful payment not found for this booking");

    const invoice = {
        invoiceNumber: `INV-${Date.now()}-${bookingId.toString().slice(-4)}`,
        date: new Date(),
        customer: {
            name: booking.user.name,
            phone: booking.user.phone
        },
        service: {
            name: booking.service.name,
            device: `${booking.deviceBrand} ${booking.deviceModel}`
        },
        technician: booking.technician ? booking.technician.name : 'N/A',
        amount: {
            base: booking.cost,
            tax: booking.cost * 0.18, // example 18% GST
            total: payment.amount,
            paidVia: payment.provider,
            transactionId: payment.transactionId
        }
    };
    return invoice;
};
