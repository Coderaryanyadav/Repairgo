const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    profilePhoto: String,
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        location: {
            type: { type: String, default: 'Point' },
            coordinates: [Number]
        }
    },
    fcmToken: { type: String }
}, { timestamps: true });

UserSchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model('User', UserSchema);
