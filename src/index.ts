import 'reflect-metadata';

import Application from './core/Application';
import config from './config/AppConfig';
const app = new Application();

app.start(config.port);

export default app;
