import 'reflect-metadata';

import Application from './core/Application';
import config from './core/config/AppConfig';

console.log(config);

const app = new Application(config);

app.start();
