const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
// Stricter limiter for login route
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
const authenticateToken = require('../middleware/auth');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validate, authController.register);

router.post('/login', loginLimiter, [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], validate, authController.login);

router.get('/profile', authenticateToken, authController.profile);

module.exports = router;


