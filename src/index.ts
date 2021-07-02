import 'reflect-metadata';
import App from './core/Application';

const app = new App({
  port: 3030,
  env: 'development',
  hostname: 'helo',
  secret: 'abc'
});

app.start();
