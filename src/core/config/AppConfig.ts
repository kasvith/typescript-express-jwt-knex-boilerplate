import { IAppConfig, ILogConfig } from './interfaces';
import { getEnv } from '../utils/Environment';
class AppConfig implements IAppConfig {
  port: number;
  name?: string | undefined;
  env: string;
  secret: string;
  hostname: string;
  isDevEnv: boolean;
  isTestEnv: boolean;
  isProdEnv: boolean;
  isEnv(env: string): boolean {
    throw new Error('Method not implemented.');
  }
  logging: ILogConfig;

  constructor() {
    this.name = getEnv('NAME');
  }
}
