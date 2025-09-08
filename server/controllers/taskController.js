const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.list = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = '', status = '' } = req.query;
    page = Math.max(parseInt(page) || 1, 1);
    limit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    let query = { user: req.user.userId };
    let projection = undefined;
    let sort = { createdAt: -1 };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
      projection = undefined;
      sort = { createdAt: -1 };
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const [tasks, total] = await Promise.all([
      Task.find(query, projection).sort(sort).skip(skip).limit(limit).lean(),
      Task.countDocuments(query)
    ]);

    return res.json({
      tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, description, status = 'pending' } = req.body;
    const task = new Task({ title, description, status, user: req.user.userId });
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId }).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const { title, description, status } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    await task.save();
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.toggle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.status = task.status === 'done' ? 'pending' : 'done';
    await task.save();
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


