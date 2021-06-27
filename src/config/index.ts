import { Config } from './Config';
import { getEnv, getEnvWithDefault, EnvType } from '../utils/Environment';
import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
  port: getEnv('PORT', EnvType.number) as number,
  name: process.env.NAME || 'My App',
  env: process.env.NODE_ENV || 'development',
  secret: process.env.APP_SECRET || 'somesecret',
  hostname: process.env.HOSTNAME || 'http://localhost:3000'
};

export default config;
