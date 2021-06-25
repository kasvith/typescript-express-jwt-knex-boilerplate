import { Config } from './Config';
import { getEnv } from '../utils/Environment';

const config: Config = {
  port: Number(getEnv('PORT') || 3000),
  name: process.env.NAME || 'My App',
  env: process.env.NODE_ENV || 'development',
  secret: process.env.APP_SECRET || 'somesecret',
  hostname: process.env.HOSTNAME || 'http://localhost:3000'
};

export default config;
