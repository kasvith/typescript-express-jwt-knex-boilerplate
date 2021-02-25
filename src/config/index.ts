// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config() // load .env file

export interface AppConfig {
  port: number,
  name: string,
  env: string,
  secret: string,
  hostname: string,
  mongo: {
    uri: string
  },
  transporter: {
    smtp: {
      host: string,
      port: number,
      username: string,
      password: string
    }
  },
  isDevEnv: boolean
}
module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  mongo: {
    uri: process.env.MONGOURI
  },
  transporter: {
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    username: process.env.TRANSPORTER_USERNAME,
    password: process.env.TRANSPORTER_PASSWORD
  },
  isDevEnv: process.env.NODE_ENV === 'development'
}
