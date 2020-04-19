const User = require('./user.model');

const getAll = async () => User.find({});

const getUser = async id =>
  User.findOne({
    _id: id
  });

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (id, user) => User.updateOne({ _id: id }, user);

const deleteUser = async id => User.deleteOne({ _id: id });

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
