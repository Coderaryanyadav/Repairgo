const { Queue } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
};

const bookingQueue = new Queue('booking_matching_queue', { connection });

async function addBookingToMatchQueue(booking) {
    // Push booking directly into the Redis queue for the matching worker
    await bookingQueue.add('match-technician', booking);
}

module.exports = {
    addBookingToMatchQueue,
    bookingQueue,
};
