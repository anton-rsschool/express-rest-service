const { finished } = require('stream');

const { logger } = require('../logger/logger');

const loggerMiddlewar = (req, res, next) => {
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

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const { statusCode } = res;
    const errorLog = {
      level: 'error',
      message: 'Response error log',
      timestamp: new Date(),
      statusCode
    };
    if (statusCode > 399) {
      logger.error(errorLog);
    }
  });
};

exports.loggerMiddlewar = loggerMiddlewar;
