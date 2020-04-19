const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
  _id: {
    type: String,
    default: uuid
  }
});

taskSchema.statics.toResponse = user => {
  const { id, title, order, description, userId, boardId, columnId } = user;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
