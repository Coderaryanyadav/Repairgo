const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
    creatorModel: { type: String, enum: ['User', 'Technician'], required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'creatorModel' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    subject: { type: String, required: true },
    issueDescription: { type: String, required: true },
    status: {
        type: String,
        enum: ['Open', 'In_Progress', 'Resolved', 'Closed'],
        default: 'Open'
    }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);
