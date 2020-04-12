const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  // Пробелы в начале строки
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

exports.logger = logger;
