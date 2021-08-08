import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import config from './config/config';
import App from '@/App';
const app = new App();

app.start(config.port);

export default app;
