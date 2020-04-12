/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
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
