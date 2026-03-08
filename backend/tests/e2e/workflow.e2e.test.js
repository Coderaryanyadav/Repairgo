const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const http = require('http');
const express = require('express');

// Mocks
jest.mock('../../src/config/redis', () => ({
    get: jest.fn(),
    setex: jest.fn()
}));
jest.mock('../../services/queueService', () => ({
    addBookingToMatchQueue: jest.fn()
}));
jest.mock('../../services/notificationService', () => ({
    sendPushNotification: jest.fn()
}));

let app;
let server;
let mongoServer;
let testUserId;
let authToken;

beforeAll(async () => {
    // 1. Start InMemory Mongo for isolation
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // 2. Setup Express correctly mocking server
    app = express();
    app.use(express.json());

    // Inject Mock IO
    const mockIo = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    app.set('io', mockIo);

    // Routes
    app.use('/api/bookings', require('../../src/routes/bookings'));
    app.use('/api/auth', require('../../src/routes/auth'));

    server = http.createServer(app);

    // 3. Seed User & generate Token
    const User = require('../../src/models/User');
    const user = await User.create({
        name: 'Test Customer',
        phone: '+919999999999',
        email: 'test@example.com'
    });
    testUserId = user._id;

    // Mock JWT logic for tests
    const jwt = require('jsonwebtoken');
    authToken = jwt.sign({ id: user._id, role: 'Customer' }, 'test_secret_key');
    process.env.JWT_SECRET = 'test_secret_key'; // override env
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Module 11 - Full Workflow E2E', () => {
    let activeBookingId;

    it('Step 1: Customer Creates a Booking', async () => {
        const payload = {
            serviceId: new mongoose.Types.ObjectId(),
            deviceBrand: 'Samsung',
            deviceModel: 'S23',
            issue: 'Screen Cracked',
            coordinates: [77.2090, 28.6139],
            cost: 2999
        };

        const res = await request(app)
            .post('/api/bookings/create')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toBe('Finding_Technician');
        activeBookingId = res.body.data._id;
    });

    it('Step 2: Update Status to Accepted (Worker Sim)', async () => {
        const mockTechId = new mongoose.Types.ObjectId();
        const payload = {
            bookingId: activeBookingId,
            status: 'Accepted',
            technician: mockTechId
        };

        const res = await request(app)
            .put('/api/bookings/update-status')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe('Accepted');
    });

    it('Step 3: Transition to En_Route', async () => {
        const payload = {
            bookingId: activeBookingId,
            status: 'En_Route',
        };

        const res = await request(app)
            .put('/api/bookings/update-status')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe('En_Route');
    });

    it('Step 4: Transition to Completed', async () => {
        const payload = {
            bookingId: activeBookingId,
            status: 'Completed',
        };

        const res = await request(app)
            .put('/api/bookings/update-status')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.status).toBe('Completed');
    });
});
