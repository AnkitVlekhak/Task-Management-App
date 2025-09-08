const { NODE_ENV } = require('../config');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  const payload = { message };
  if (NODE_ENV === 'development') {
    payload.stack = err.stack;
  }
  if (req.log) {
    req.log.error({ err }, message);
  } else {
    // Fallback if logger not present
    console.error(err);
  }
  res.status(status).json(payload);
}

module.exports = errorHandler;


