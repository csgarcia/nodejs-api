//TODO feel free to custom the log as you want

const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.json(),
    ),
    colorize: true,
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({
            filename: path.resolve(__dirname, '../../logs/error.log'),
            level: 'error',
        }),
        // - Write all logs with level `info` and below to `combined.log`
        new winston.transports.File({ filename: path.resolve(__dirname, '../../logs/combined.log') }),
    ],
});

if (process.env.NODE_ENV !== 'prd') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

module.exports = logger;