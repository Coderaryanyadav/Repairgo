const admin = require('../src/config/firebase');
const Notification = require('../src/models/Notification');
const User = require('../src/models/User');
const Technician = require('../src/models/Technician');

/**
 * Send a generic push notification using Firebase Cloud Messaging.
 * Also stores a record in the database.
 * 
 * @param {string} recipientModel "User" or "Technician"
 * @param {string} recipientId MongoDB ObjectId
 * @param {string} fcmToken The device FCM token
 * @param {string} title Notification Title
 * @param {string} body Notification Body
 * @param {object} data Optional payload for deep linking
 */
exports.sendPushNotification = async (recipientModel, recipientId, fcmToken, title, body, data = {}) => {
    try {
        // 1. Store Notification in DB for history/in-app display
        await Notification.create({
            recipientModel,
            recipientId,
            title,
            body,
            data
        });

        // 2. If no FCM token is provided, we can't send a push (user might have disabled them or is logged out)
        if (!fcmToken) {
            console.log(`[Notification Service] No FCM Token for ${recipientModel} ${recipientId}. Event logged in DB.`);
            return { success: false, message: 'No FCM token provided' };
        }

        // 3. Construct Message Payload
        const message = {
            notification: { title, body },
            data: {
                ...data,
                click_action: 'FLUTTER_NOTIFICATION_CLICK', // standard React Native fallback handler pattern
            },
            token: fcmToken
        };

        // 4. Send via Firebase Admin SDK
        const response = await admin.messaging().send(message);
        console.log(`[Notification Service] Push dispatched to ${fcmToken}:`, response);
        return { success: true, response };

    } catch (error) {
        console.error(`[Notification Service] Error sending push:`, error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Trigger: Backend matching worker sends job to Technician
 */
exports.notifyTechnicianJobDispatch = async (technician, booking) => {
    return await this.sendPushNotification(
        'Technician',
        technician._id,
        technician.fcmToken, // Assuming fcmToken is stored on model or fetched dynamically from Redis
        'New Repair Request!',
        `A new repair request for a ${booking.deviceBrand} is available near you. Tap to accept.`,
        { bookingId: String(booking._id), type: 'JOB_DISPATCH' }
    );
};

/**
 * Trigger: Technician clicks "Accept" -> Notify Customer
 */
exports.notifyCustomerJobAccepted = async (customer, technician, booking) => {
    return await this.sendPushNotification(
        'User',
        customer._id,
        customer.fcmToken,
        'Technician Assigned',
        `${technician.name} has accepted your repair request and is reviewing details.`,
        { bookingId: String(booking._id), type: 'JOB_ACCEPTED' }
    );
};

/**
 * Trigger: Technician clicks "Start Navigation" -> Notify Customer
 */
exports.notifyCustomerTechEnRoute = async (customer, technician, booking) => {
    return await this.sendPushNotification(
        'User',
        customer._id,
        customer.fcmToken,
        'Technician is on the way!',
        `${technician.name} is heading to your location. Track them live!`,
        { bookingId: String(booking._id), type: 'TECH_EN_ROUTE' }
    );
};

/**
 * Trigger: Technician marks job as "Completed" -> Notify Customer for Payment/Review
 */
exports.notifyCustomerJobCompleted = async (customer, booking) => {
    return await this.sendPushNotification(
        'User',
        customer._id,
        customer.fcmToken,
        'Repair Completed!',
        `Your repair for ${booking.deviceBrand} is complete. Please complete the payment and review your technician.`,
        { bookingId: String(booking._id), type: 'JOB_COMPLETED' }
    );
};
