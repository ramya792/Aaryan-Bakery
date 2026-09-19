require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const publicRoutes = require('./routes/public');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.removeHeader('X-Powered-By');
  next();
});

// Rate limiters
const rateLimit = require('express-rate-limit');
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, answer: "Too many requests. Please wait a moment or contact 9701969499." }
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again in 15 minutes." }
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', publicRoutes);
app.use('/api/chat', chatLimiter, chatRoutes);
app.use('/api/admin/login', adminLimiter);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sweet Studio — Aaryan Bakery API',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Sweet Studio — Aaryan Bakery Backend API Server Running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Backend Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`Sweet Studio — Aaryan Bakery Backend Server Running`);
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Public API: http://localhost:${PORT}/api`);
    console.log(`Admin Login API: http://localhost:${PORT}/api/admin/login`);
    console.log(`AI Chat API: http://localhost:${PORT}/api/chat`);
    console.log(`==================================================`);
  });
}

module.exports = app;
