import { Config } from './Config';
import { getEnv } from '../utils/Env';
import dotenv from 'dotenv';

const config: Config = {
  port: Number(getEnv('PORT') || 3000),
  name: process.env.NAME || 'My App',
  env: process.env.NODE_ENV || 'development',
  secret: process.env.APP_SECRET || 'somesecret',
  hostname: process.env.HOSTNAME || 'http://localhost:3000',
  mongo: {
    uri: process.env.MONGOURI || 'mongodb://localhost:27017/myapp'
  },
  transporter: {
    smtp: {
      host: process.env.TRANSPORTER_HOST,
      port:
        (process.env.TRANSPORTER_PORT &&
          Number(process.env.TRANSPORTER_PORT)) ||
        465,
      username: process.env.TRANSPORTER_USERNAME,
      password: process.env.TRANSPORTER_PASSWORD
    }
  },
  isDevEnv: process.env.NODE_ENV === 'development'
};

export default config;
