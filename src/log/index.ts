'use strict';

import config from '../config';
import winston from 'winston';

const logLevel = config.isDevEnv ? 'debug' : 'info';

const logger = winston.createLogger({
  level: logLevel
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.simple()
      )
    })
  );
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.json()
      )
    })
  );
}

export default logger;
