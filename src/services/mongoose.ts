'use strict';

import config from '../config';
import mongoose from 'mongoose';
import log from '../log';
import Bluebird = require('bluebird');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>mongoose).Promise = Bluebird;

mongoose.connection.on('connected', () => {
  log.info('MongoDB is connected');
});

mongoose.connection.on('error', async (err) => {
  log.error(`Could not connect to MongoDB because of ${err}`, { error: err });
  await mongoose.disconnect();
});

if (config.isDevEnv) {
  mongoose.set('debug', true);
}

export async function connect(): Promise<mongoose.Connection> {
  try {
    const connectionOpts: mongoose.ConnectionOptions = {
      keepAlive: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true
    };
    await mongoose.connect(config.mongo.uri, connectionOpts);
  } catch (error) {
    log.error('Error connecting to MongoDB', { error });
  }

  return mongoose.connection;
}
