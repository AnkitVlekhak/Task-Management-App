const { validationResult } = require('express-validator');
const { registerUser, loginUser, getProfile } = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const { token, user } = await registerUser({ name, email, password });
    return res.status(201).json({ message: 'User created successfully', token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    return res.json({ message: 'Login successful', token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await getProfile(req.user.userId);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


