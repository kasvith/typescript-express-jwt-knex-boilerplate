'use strict';

import * as mongoose from './services/mongoose';
import * as app from './services/express';
import { EnvironmentError } from './errors/EnvironmentError';
import { ApiError } from './errors/APIError';
import { getEnv } from './utils/Env';
import ErrorCodes from './errors/errorCodes';

console.log(new ApiError('he', 40, ErrorCodes.ValidationError));

// start app and connect to database
app.start();
mongoose.connect();

module.exports = app;
