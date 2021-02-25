'use strict';

import * as mongoose from './services/mongoose';
import * as app from './services/express';
import { EnvironmentError } from './errors/EnvironmentError';
import { ApiError } from './errors/APIError';

console.log(JSON.stringify(new ApiError('hi')));

// start app and connect to database
app.start();
mongoose.connect();

module.exports = app;
