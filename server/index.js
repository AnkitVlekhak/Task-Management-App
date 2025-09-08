const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const pino = require('pino');
const pinoHttp = require('pino-http');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { connectDB } = require('./config/db');
const config = require('./config/index');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = config.PORT;

// Middleware
const allowedOrigin = config.FRONTEND_URL;
app.use(cors({
  origin: allowedOrigin,
  credentials: false,
}));
app.use(helmet());
app.use(compression());
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
app.use(pinoHttp({ logger }));
app.use(rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max }));
app.use(express.json());

// Basic health endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Connect to MongoDB
connectDB(config.MONGODB_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down...`);
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
  // Force exit if not closed in time
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
