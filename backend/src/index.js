require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route Imports
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const technicianRoutes = require('./routes/technicians');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');

// Middleware Imports
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

// Broadcast Setup & Realtime Event Mapping
io.on('connection', (socket) => {
    console.log(`[Socket.IO] New connection established: ${socket.id}`);

    // Join specialized Room based on Booking ID constraint
    socket.on('joinBookingRoom', (bookingId) => {
        socket.join(`booking_${bookingId}`);
        console.log(`[Socket.IO] Socket ${socket.id} joined room: booking_${bookingId}`);
    });

    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Disconnected: ${socket.id}`);
    });
});

// App-level dependency injection for controllers to emit events (e.g., req.app.get('io'))
app.set('io', io);
const pinoHttp = require('pino-http');
const logger = require('./config/logger');

// Security and Utility Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
// Replace Morgan with structured Pino logging globally
app.use(pinoHttp({ logger, autoLogging: false })); // Keeps stdout clean unless needed or set to true for deep analysis

// Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint (For AWS ALB / Docker compose monitors)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'API Endpoint not found' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('MongoDB connected successfully');

    // CHANGE: Execute Server listen instead of Express's standalone `.listen` wrapper
    server.listen(PORT, () => {
        logger.info(`[HTTP/WebSocket] Server running on port ${PORT}`);
    });
}).catch(err => {
    logger.error({ msg: 'Database connection error', err });
});
