const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
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

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log("we're connected!");
  db.dropDatabase();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
