/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { ILogger } from './logging/Logger';
import { LogLevel } from './logging/LogLevel';

export enum WinstonLogFormat {
  Json = 'json',
  Simple = 'simple'
}

type WinstonLoggerOptions = {
  level?: LogLevel;
  format?: WinstonLogFormat;
  colorize?: boolean;
};

export class WinstonLogger implements ILogger {
  _logger: winston.Logger;

  constructor({
    level = LogLevel.Info,
    colorize = false,
    format = WinstonLogFormat.Json
  }: WinstonLoggerOptions) {
    this._logger = winston.createLogger({
      level: level
    });

    let config: winston.Logform.Format[] = [];
    const commonConfig: winston.Logform.Format[] = [
      winston.format.timestamp(),
      winston.format.splat()
    ];

    if (colorize) {
      config = [...commonConfig, winston.format.colorize()];
    }

    switch (format) {
      case WinstonLogFormat.Json:
        config = [...config, winston.format.json()];
        break;

      case WinstonLogFormat.Simple:
        config = [...config, winston.format.simple()];
        break;

      default:
        break;
    }

    this._logger.add(
      new winston.transports.Console({
        format: winston.format.combine(...config)
      })
    );
  }

  info(message: string): void;
  info(message: string, meta?: any): void;
  info(message: any, meta?: any): void {
    this._logger.info(message, { ...meta });
  }

  debug(message: string): void;
  debug(message: string, meta?: any): void;
  debug(message: any, meta?: any): void {
    this._logger.debug(message, { ...meta });
  }

  warn(message: string): void;
  warn(message: string, meta?: any): void;
  warn(message: any, meta?: any): void {
    this._logger.warn(message, { ...meta });
  }

  log(message: string): void;
  log(message: string, meta?: any): void;
  log(message: any, meta?: any): void {
    this._logger.log(message, { ...meta });
  }

  error(message: string): void;
  error(message: string, error: Error, meta?: any): void;
  error(message: any, error?: any, meta?: any): void {
    if (error instanceof Error) {
      this._logger.error(message, { error: error.stack || undefined, ...meta });
    } else {
      this._logger.error(message, { ...meta });
    }
  }
}
