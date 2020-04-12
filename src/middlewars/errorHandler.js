/* eslint-disable no-unused-vars */
const { logger } = require('../logger/logger');

const errorHandler = (err, req, res, next) => {
  const log = {
    level: 'error',
    message: 'Request log',
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
    queryParams: req.query,
    body: req.body
  };
  logger.error(log);
  if (err.status) {
    res.status(err.status).send();
  } else {
    res.status(500).send();
  }
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
