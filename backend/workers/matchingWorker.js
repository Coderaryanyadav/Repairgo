require('dotenv').config();
const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const Technician = require('../src/models/Technician');
const Booking = require('../src/models/Booking');

// Setup MongoDB since this worker runs as a separate Node process (or thread)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/repargo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Worker connected to MongoDB'));

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function notifyTechnician(technician, booking) {
    // Integration point: Firebase Cloud Messaging Push Notification
    console.log(`[Push Notification Dispatch] -> Sent to Tech: ${technician.name} (ID: ${technician._id}) for Booking: ${booking._id}`);
    // e.g. await fcmAdmin.messaging().send({ token: technician.fcmToken, ... })
    return true;
}

const worker = new Worker('booking_matching_queue', async (job) => {
    console.log(`[Worker] Picked up job ${job.id} for Booking ${job.data.bookingId}`);

    const { bookingId, location, service } = job.data;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'Finding_Technician') return;

    const [longitude, latitude] = location.coordinates;

    // Expansion Strategy: 5km -> 8km -> 12km
    const radiuses = [5000, 8000, 12000];
    let matchFound = false;

    for (const currentRadius of radiuses) {
        if (matchFound) break;
        console.log(`[Worker] Starting search in radius ${currentRadius / 1000}km for Job ${bookingId}`);

        // MongoDB $nearSphere query
        const nearbyTechnicians = await Technician.findNearby(longitude, latitude, currentRadius);

        if (!nearbyTechnicians || nearbyTechnicians.length === 0) {
            console.log(`[Worker] No technicians found in ${currentRadius / 1000}km radius.`);
            continue; // Try next radius expansion
        }

        for (let i = 0; i < nearbyTechnicians.length; i++) {
            const tech = nearbyTechnicians[i];

            // Technician Availability Lock: Skip if they already have an active 'In_Progress' job
            const activeTechJobs = await Booking.countDocuments({
                technician: tech._id,
                status: { $in: ['Accepted', 'En_Route', 'In_Progress'] }
            });

            if (activeTechJobs > 0) {
                console.log(`[Worker] Skipping Tech ${tech.name} (ID: ${tech._id}) - Currently locked/busy.`);
                continue;
            }

            // Check if the tech offers the required service (filtering)
            if (!tech.servicesOffered.includes(service)) {
                continue;
            }

            // 4. Send push notification alerting tech
            await notifyTechnician(tech, booking);

            // 5. Wait 30 seconds for an acceptance
            let accepted = false;
            for (let s = 0; s < 30; s++) {
                await wait(1000); // Wait 1 second tick

                // Timeout Protection: Check live status
                const updatedBooking = await Booking.findById(bookingId);

                // Cancellation Handling mid-dispatch
                if (updatedBooking.status === 'Cancelled') {
                    console.log(`[Worker] Job ${bookingId} cancelled by user during matching.`);
                    return;
                }

                if (updatedBooking.status === 'Accepted' && String(updatedBooking.technician) === String(tech._id)) {
                    accepted = true;
                    matchFound = true;
                    console.log(`[Worker - METRIC] Dispatch SUCCESS! Job ${bookingId} Accepted by Tech ${tech.name} at radius ${currentRadius / 1000}km!`);
                    break;
                } else if (updatedBooking.status === 'Accepted') {
                    return; // Concurrency guard: accepted by someone else
                }
            }

            if (!accepted) console.log(`[Worker] Technician ${tech.name} did not accept. Moving to next technician.`);
            if (matchFound) break; // Break out of inner tech loop if matched
        }
    }

    // Final check if loop exhausted across all radii
    if (!matchFound) {
        const finalCheck = await Booking.findById(bookingId);
        if (finalCheck.status === 'Finding_Technician') {
            finalCheck.status = 'Cancelled';
            await finalCheck.save();
            console.log(`[Worker - ALERT] Exhausted all local techs up to 12km. Job ${bookingId} auto-cancelled to prevent infinite loops.`);
        }
    }

}, {
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
    }
});

worker.on('completed', job => {
    console.log(`[BullMQ Worker] Job ${job.id} completed successfully!`);
});

worker.on('failed', (job, err) => {
    console.error(`[BullMQ Worker] Job ${job.id} failed with error: ${err.message}`);
});
