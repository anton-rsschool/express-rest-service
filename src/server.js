/* eslint-disable no-unused-vars */
process.on('uncaughtException', (error, origin) => {
  console.error(`Error: ${error.message}`);
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Error: ${reason.message}`);
  const exit = process.exit;
  exit(1);
});

const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
