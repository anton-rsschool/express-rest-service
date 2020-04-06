const User = require('./user.model');

const users = new Array(1).fill('').map(() => new User());

const getAll = async () => {
  return users;
};

const getUser = async id => {
  const user = users.find(item => item.id === id);
  return user || false;
};

const createUser = async user => {
  const newUser = new User({ ...user });
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, user) => {
  const index = users.findIndex(item => item.id === id);
  if (index === -1) return false;
  const newUser = new User({ id, ...user });
  users[index] = newUser;
  return newUser;
};

const deleteUser = async id => {
  const index = users.findIndex(item => item.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
