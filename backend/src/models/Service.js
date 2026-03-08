const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: String },
    basePrice: { type: Number, required: true },
    estimatedTimeMinutes: { type: Number, default: 30 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
