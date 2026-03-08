const Booking = require('../models/Booking');
const { addBookingToMatchQueue } = require('../../services/queueService');

exports.createBooking = async (req, res) => {
    try {
        const { serviceId, deviceBrand, deviceModel, issue, coordinates, cost } = req.body;

        // Create the booking
        const booking = await Booking.create({
            user: req.user.id,
            service: serviceId,
            deviceBrand,
            deviceModel,
            issue,
            location: {
                type: 'Point',
                coordinates
            },
            cost,
            status: 'Finding_Technician' // Trigger matching flow
        });

        // 2. Job pushed to queue (STEP 4 implementation hook)
        await addBookingToMatchQueue({
            bookingId: booking._id,
            location: booking.location,
            service: serviceId
        });

        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('technician', 'name phone profilePhoto');
    if (!booking) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: booking });
};

exports.getBookingHistory = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, data: bookings });
};

exports.updateBookingStatus = async (req, res) => {
    const { bookingId, status } = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

    // Broadcast status change over WebSocket
    const io = req.app.get('io');
    if (io) {
        if (status === 'Accepted') {
            io.to(`booking_${bookingId}`).emit('technician_assigned', { technicianId: booking.technician });
        } else if (status === 'Completed') {
            io.to(`booking_${bookingId}`).emit('repair_completed', { message: 'Repair processing finalized.' });
        } else {
            io.to(`booking_${bookingId}`).emit('booking_status_update', { status });
        }
    }

    res.status(200).json({ success: true, data: booking });
};

exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true });
    res.status(200).json({ success: true, data: booking });
};
