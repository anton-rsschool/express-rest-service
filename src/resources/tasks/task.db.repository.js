const Task = require('./task.model');

const getAll = async () => Task.find({});

const getTasksByBoard = async boardId => Task.find({ boardId });

const getTask = async id => Task.findOne({ _id: id });

const createTask = async task => Task.create(task);

const updateTask = async (boardId, taskId, task) =>
  Task.updateOne({ _id: taskId }, task);

const deleteTask = async id => Task.deleteOne({ _id: id });

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByBoard
};
