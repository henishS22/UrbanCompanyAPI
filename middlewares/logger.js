const { json } = require('body-parser');
const winston = require('winston');

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/server.log',
            format:winston.format.combine(
                winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                winston.format.align(),
                // winston.format.printf(info => `{"level": "${info.level}", "time": "${[info.timestamp]}", "message": "${info.message}"}`),
                winston.format.json(winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
                
            ),
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            format:winston.format.combine(
                winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                winston.format.align(),
                // winston.format.printf(info => `{"level": "${info.level}", "time": "${[info.timestamp]}", "message": "${info.message}"}`),
                winston.format.json(winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
                
            ),
        })
    ],
    exceptionHandlers: [
        new winston.transports.File(
          {
            filename: './logs/exceptions.log',
            timestamp: true,
            maxsize: 5242880,
            json: true,
            colorize: true,
          },
        ),
      ],
      exitOnError: false,
})

module.exports = logger;
module.exports.stream = {
    write(message) {
      logger.info(message);
    },
  };
  