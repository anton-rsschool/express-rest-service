const Task = require('./task.model');

const tasks = new Array(1).fill('').map(() => new Task());

const getAll = async () => {
  return tasks;
};

const getTasksByBoard = async boardId => {
  return tasks.filter(item => item.boardId === boardId);
};

const getTask = async id => {
  const task = tasks.find(item => item.id === id);
  return task || false;
};

const createTask = async (task = {}) => {
  const newTask = new Task({ ...task });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (boardId, taskId, task) => {
  const index = tasks.findIndex(item => item.id === taskId);
  const newTask = { ...tasks[index], ...task };
  tasks[index] = newTask;
  return newTask;
};

const deleteTask = async id => {
  const index = tasks.findIndex(item => item.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByBoard
};
