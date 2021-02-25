'use strict'

const config = require('../config')
const mongoose = require('mongoose')
const log = require('../log')
mongoose.Promise = require('bluebird')

mongoose.connection.on('connected', () => {
  log.info('MongoDB is connected')
})

mongoose.connection.on('error', async (err) => {
  log.error(`Could not connect to MongoDB because of ${err}`, {error: err})
  await mongoose.disconnect()
})

if (config.isDevEnv) {
  mongoose.set('debug', true)
}

exports.connect = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      keepAlive: 1,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true
    })
  } catch (error) {
    log.error('Error connecting to MongoDB', {error})
  }

  return mongoose.connection
}
