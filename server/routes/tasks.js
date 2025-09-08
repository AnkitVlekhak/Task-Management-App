const express = require('express');
const { body, param } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const validate = require('../middleware/validate');
const taskController = require('../controllers/taskController');

const router = express.Router();

// All routes protected
router.use(authenticateToken);

// List tasks with search/filter/pagination
router.get('/', taskController.list);

// Create task
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').optional().isIn(['pending', 'done']).withMessage('Invalid status'),
], validate, taskController.create);

// Get single task
router.get('/:id', [param('id').isMongoId().withMessage('Invalid task id')], validate, taskController.getOne);

// Update task
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().isString().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().isString().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('status').optional().isIn(['pending', 'done']).withMessage('Invalid status'),
], validate, taskController.update);

// Delete task
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid task id')], validate, taskController.remove);

// Toggle task status
router.patch('/:id/toggle', [param('id').isMongoId().withMessage('Invalid task id')], validate, taskController.toggle);

module.exports = router;


