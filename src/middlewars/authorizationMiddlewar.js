const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const { createError } = require('./errorHandler');

const checkTokenExcept = exceptionRoutes => (req, res, next) => {
  if (exceptionRoutes.includes(req.path)) return next();

  // eslint-disable-next-line dot-notation
  const token = req.headers['authorization'];
  if (!token) return next(createError(401));
  jwt.verify(token.split(' ')[1], JWT_SECRET_KEY, err => {
    if (err) return next(createError(401));
    next();
  });
};

module.exports = { checkTokenExcept };
