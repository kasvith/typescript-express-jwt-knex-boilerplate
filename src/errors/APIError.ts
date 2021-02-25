import httpStatus from 'http-status';
import errorCodes from './errorCodes';

export interface IApiError {
  message: string;
  status?: number;
  errorCode?: number;
  errors?: unknown;
}

export class ApiError extends Error {
  status: number;
  errorCode: number;
  errors?: unknown;

  constructor(
    message: string,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    errorCode = errorCodes.UnknownError,
    errors?: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.message = message;
    this.status = status;
    this.errorCode = errorCode;
    this.errors = errors;
  }

  toJSON(): IApiError {
    return {
      message: this.message,
      status: this.status,
      errorCode: this.errorCode,
      errors: this.errors
    };
  }
}
