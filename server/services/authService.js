const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    const err = new Error('User already exists');
    err.status = 400;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 400;
    throw err;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    const err = new Error('Invalid credentials');
    err.status = 400;
    throw err;
  }
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
}

async function getProfile(userId) {
  return User.findById(userId).select('-password').lean();
}

module.exports = { registerUser, loginUser, getProfile };


