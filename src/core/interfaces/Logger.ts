/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILogger {
  info(message: string): void;
  info(message: string, ...meta: any[]): void;

  error(message: string): void;
  error(message: string, ...meta: any[]): void;

  debug(message: string): void;
  debug(message: string, ...meta: any[]): void;

  warn(message: string): void;
  warn(message: string, ...meta: any[]): void;

  log(message: string): void;
  log(message: string, ...meta: any[]): void;
}
