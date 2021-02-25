'use strict'

const httpStatus = require('http-status')
const APIError = require('../errors/APIError')
const ev = require('express-validation')
const errorCodes = require('../errors/errorCodes')

// hanlde not found error
exports.handleNotFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND)
  res.json(new APIError('Requested resources not found', httpStatus.NOT_FOUND))
  res.end()
}

// handle errors
exports.handleError = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.status)
      .json(err)
  }

  if (err instanceof ev.ValidationError) {
    return res.status(err.status)
      .json(new APIError(err.message, err.status || httpStatus.BAD_REQUEST, errorCodes.ValidationError, err.errors))
  }

  console.error(err)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .json(new APIError(err.message || 'Unknown error occured'))
}
