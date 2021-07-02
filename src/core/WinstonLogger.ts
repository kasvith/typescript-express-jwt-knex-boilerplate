/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { ILogger } from './interfaces/Logger';

enum LogLevel {
  Info = 'info',
  Debug = 'debug'
}

class Logger implements ILogger {
  logger: winston.Logger;

  constructor(level: LogLevel) {
    this.logger = winston.createLogger({
      level: level
    });
  }
  error(message: string, ...meta: any[]): void;
  error(message: string, type: string, error: Error, ...meta: any[]): void;
  error(message: any, type?: any, error?: any, ...meta: any[]): void {
    throw new Error('Method not implemented.');
  }

  info(message: string): void;
  info(message: string, ...meta: any[]): void;
  info(message: any, ...rest: any[]): void {
    this.logger.info();
  }

  debug(message: string): void;
  debug(message: string, ...meta: any[]): void;
  debug(message: any, ...rest: any[]): void {
    throw new Error('Method not implemented.');
  }

  warn(message: string): void;
  warn(message: string, ...meta: any[]): void;
  warn(message: any, ...rest: any[]): void {
    throw new Error('Method not implemented.');
  }

  log(message: string): void;
  log(message: string, ...meta: any[]): void;
  log(message: any, ...rest: any[]): void {
    throw new Error('Method not implemented.');
  }
}
