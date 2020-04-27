const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../common/config');
const userService = require('../users/user.service');

const getToken = async body => {
  const { login, password } = body;
  const users = await userService.getAll();
  const user = users.find(item => item.login === login);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  const payload = {
    userId: user.id,
    login
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 });
  return token;
};

module.exports = { getToken };
