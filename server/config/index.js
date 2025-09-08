const assert = (cond, msg) => { if (!cond) { throw new Error(msg); } };

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '5007', 10);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

assert(JWT_SECRET, 'JWT_SECRET must be set');

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  FRONTEND_URL,
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
};


