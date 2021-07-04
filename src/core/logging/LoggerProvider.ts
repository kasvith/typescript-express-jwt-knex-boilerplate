import { ILogger } from './Logger';

export interface ILoggerProvider {
  create(context: string): ILogger;
}
