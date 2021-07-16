import 'reflect-metadata';
import Application from './core/Application';

const app = new Application({
  env: '',
  hostname: '',
  isDevEnv: false,
  isEnv: () => false,
  isProdEnv: false,
  isTestEnv: false,
  logging: {
    color: false,
    level: 'info'
  },
  port: 5000,
  secret: 'a',
  name: ''
});

app.start();
