import dotenv from 'dotenv';

import { getEnv } from '../core/utils/Environment';
import { IAppConfig } from './interfaces';
dotenv.config();

const env = getEnv('NODE_ENV') || 'production';

const config: IAppConfig = {
  env,
  app: getEnv('APP'),
  hostname: getEnv('HOSTNAME'),
  isDevEnv: env === 'development',
  isProdEnv: env === 'production',
  isTestEnv: env === 'test',
  port: parseInt(getEnv('PORT') || '5000')
};

export default config;
