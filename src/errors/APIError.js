'use strict'
const httpStatus = require('http-status')
const errorCodes = require('./errorCodes')

/**
 * API Error describes an error object wrapped with API specific data
 *
 * @param {string} message - message text
 * @param {number} [status=httpStatus.INTERNAL_SERVER_ERROR] - http error code
 * @param {number} [errorCode=errorCodes.UnkownError] - application error code
 * @param {object} [errors=null] - extra errors
 */
function APIError (
  message,
  status = httpStatus.INTERNAL_SERVER_ERROR,
  errorCode = errorCodes.UnkownError,
  errors = null
) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
  this.status = status
  this.errorCode = errorCode
  this.errors = errors
}

module.exports = APIError

require('util').inherits(module.exports, Error)
