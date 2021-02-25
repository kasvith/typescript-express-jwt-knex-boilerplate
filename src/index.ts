'use strict';

import * as mongoose from './services/mongoose';
import * as app from './services/express';

// start app and connect to database
app.start();
mongoose.connect();

module.exports = app;
