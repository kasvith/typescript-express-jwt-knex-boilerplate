'use strict'

const config = require('../config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const errorHandler = require('../middlewares/error-handler')
const apiRouter = require('../routes/api')
const passport = require('passport')
const passportStrategy = require('../services/passport')

const path = require('path')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const log = require('../log')

const app = express()
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// setup openapi
const openApiDocument = YAML.load(path.resolve(__dirname, '../../openapi/v1/api.yaml'))
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(openApiDocument))

if (config.env !== 'test') app.use(morgan('combined'))

// passport
app.use(passport.initialize())
passport.use('jwt', passportStrategy.jwt)

app.use('/api/v1', apiRouter)

app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      log.error(`Error starting the app`, { error: err })
      process.exit(-1)
    }

    log.info(`${config.app} is running on ${config.port}`)
  })
}

exports.app = app
