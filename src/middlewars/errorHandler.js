/* eslint-disable no-unused-vars */
const { logger } = require('../logger/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const log = {
    level: 'error',
    message: 'Response error log',
    timestamp: new Date(),
    status
  };
  logger.error(log);
  res.status(status).send();
  return;
};

const createError = status => {
  const error = new Error();
  if (status) {
    error.status = status;
  }
  return error;
};

exports.errorHandler = errorHandler;
exports.createError = createError;
