const { logger } = require('./logger/logger');

process.on('uncaughtException', error => {
  const log = {
    level: 'error',
    message: 'Uncaught exception',
    stack: error.stack
  };
  logger.error(log);
  const exit = process.exit;
  logger.on('finish', () => {
    exit(1);
  });
});

process.on('unhandledRejection', reason => {
  const log = {
    level: 'error',
    message: 'Unhandled rejection',
    stack: reason.stack
  };
  logger.error(log);
  const exit = process.exit;
  logger.on('finish', () => {
    exit(1);
  });
});

const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
