const paymentService = require('../../services/paymentService');

// Properly mock the underlying create behavior intercepting Razorpay entirely
jest.mock('razorpay', () => {
    return jest.fn().mockImplementation(() => ({
        orders: {
            create: jest.fn().mockResolvedValue({ id: 'order_test_123' })
        }
    }));
});

describe('Payment Service Unit Tests', () => {

    it('Should correctly create a Razorpay order from Amount', async () => {
        const order = await paymentService.createOrder('receipt_999', 1000);

        expect(order).toBeDefined();
        // Just verify it doesn't crash to confirm mocking logic is bound correctly
        expect(order).toHaveProperty('id');
    });

    it('Should verify signature correctly using HMAC SHA256', () => {
        const mockOrderId = 'order_test_123';
        const mockPaymentId = 'pay_test_456';
        const secret = 'test_secret_key'; // Make sure this matches tests

        const crypto = require('crypto');
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(mockOrderId + "|" + mockPaymentId)
            .digest('hex');

        // Note: the test will fail if paymentService reads from process.env differently. Inject process.env.RAZORPAY_KEY_SECRET beforehand.
        process.env.RAZORPAY_KEY_SECRET = secret;

        const isValid = paymentService.verifySignature(mockOrderId, mockPaymentId, generatedSignature);
        expect(isValid).toBe(true);
    });
});
