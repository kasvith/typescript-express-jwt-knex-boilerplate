/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { ILogger } from './interfaces/Logger';

export enum LogLevel {
  Info = 'info',
  Debug = 'debug',
  Warn = 'warn',
  Error = 'error'
}

export class Logger implements ILogger {
  logger: winston.Logger;

  constructor(level: LogLevel) {
    this.logger = winston.createLogger({
      level: level
    });

    this.logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.simple()
        )
      })
    );
  }
  error(message: string): void;
  error(message: string, error: Error, meta: any): void;
  error(message: any, error?: any, meta?: any): void {
    if (error) {
      this.logger.error(message, { error: error.stack || {}, ...meta });
    } else {
      this.logger.error(message, { ...meta });
    }
  }

  info(message: string): void;
  info(message: string, meta: any): void;
  info(message: any, meta?: any): void {
    this.logger.info(message, meta);
  }

  debug(message: string): void;
  debug(message: string, meta: any): void;
  debug(message: any, meta?: any): void {
    this.logger.debug(message, meta);
  }
  warn(message: string): void;
  warn(message: string, meta: any): void;
  warn(message: any, meta?: any): void {
    this.logger.warn(message, meta);
  }
  log(message: string): void;
  log(message: string, meta: any): void;
  log(message: any, meta?: any): void {
    this.logger.log(message, meta);
  }
}
