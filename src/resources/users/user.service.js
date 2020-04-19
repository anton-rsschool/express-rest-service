const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = user => usersRepo.createUser(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = async id => {
  const tasks = await tasksService.getAll();
  const responses = await Promise.all([
    ...tasks
      .filter(item => item.userId === id)
      .map(item => tasksService.updateTask(null, item.id, { userId: null })),
    usersRepo.deleteUser(id)
  ]);

  return responses[responses.length - 1];
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
