const mongoose = require('mongoose');

const TechnicianSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    profilePhoto: String,
    isOnline: { type: Boolean, default: false },
    servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    currentLocation: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [longitude, latitude]
    },
    fcmToken: { type: String },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 }
}, { timestamps: true });

// Geospatial index for technician search
TechnicianSchema.index({ currentLocation: "2dsphere" });

// Static method for geospatial query with Redis Caching
TechnicianSchema.statics.findNearby = async function (longitude, latitude, maxDistanceInMeters = 5000) {
    // Attempt cache check avoiding hammering Mongoose on mass queue sweeps
    const redis = require('../../config/redis');
    const cacheKey = `geo_techs:${Math.round(longitude * 1000)}:${Math.round(latitude * 1000)}:${maxDistanceInMeters}`;

    try {
        const cached = await redis.get(cacheKey);
        if (cached) return JSON.parse(cached);
    } catch (err) {/* skip redis fail */ }

    const results = await this.find({
        isOnline: true,
        currentLocation: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                $maxDistance: maxDistanceInMeters
            }
        }
    });

    try {
        // Cache this exact radius result for 15 seconds! Fast enough for movement, slow enough to block DDoSing DB.
        await redis.setex(cacheKey, 15, JSON.stringify(results));
    } catch (err) { }

    return results;
};

module.exports = mongoose.model('Technician', TechnicianSchema);
