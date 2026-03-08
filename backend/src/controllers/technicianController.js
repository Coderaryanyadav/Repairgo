const Technician = require('../models/Technician');
const Booking = require('../models/Booking');

exports.updateLocation = async (req, res) => {
    try {
        const { coordinates } = req.body; // [longitude, latitude]

        await Technician.findByIdAndUpdate(req.user.id, {
            $set: {
                currentLocation: {
                    type: 'Point',
                    coordinates
                }
            }
        });

        // Broadcast to WebSocket clients specifically sitting in the matching Room!
        const { activeBookingId } = req.body;
        if (activeBookingId) {
            const io = req.app.get('io');
            io.to(`booking_${activeBookingId}`).emit('technician_location_update', { coordinates });
        }

        res.status(200).json({ success: true, message: 'Location updated via HTTP & Emitted over WS' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLiveLocation = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate('technician', 'currentLocation name phone');

        if (!booking || !booking.technician) {
            return res.status(404).json({ success: false, message: 'Booking or Technician not found' });
        }

        res.status(200).json({
            success: true,
            coordinates: booking.technician.currentLocation.coordinates
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
