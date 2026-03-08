const Redis = require('ioredis');

// Connect to Redis for caching map locations and high-traffic requests
const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
});

redis.on('connect', () => console.log('Redis Cache Client connected'));
redis.on('error', (err) => console.error('Redis Cache Error', err));

module.exports = redis;
