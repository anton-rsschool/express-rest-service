const { logger } = require('../logger/logger');

const requestLogger = (req, res, next) => {
  const log = {
    level: 'info',
    message: 'Request log',
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
    queryParams: req.query,
    body: req.body
  };
  logger.info(log);
  next();
};

exports.requestLogger = requestLogger;
