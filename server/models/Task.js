const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

taskSchema.index({ title: 'text', description: 'text' });
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);


