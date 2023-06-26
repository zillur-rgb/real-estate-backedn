/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../config/config'
import ApiError from '../errors/ApiError'
import { IGenericErrorMessage } from '../types/error.interface'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console is enough for us to see the logs in development mode but
  // it is not enough in pproduction mode
  config.env === 'development'
    ? console.log('Global error handler: ', error)
    : console.error('Global error handler: ', error)

  let statusCode = 500
  let message = 'Something went worng!'
  let errorMessages: IGenericErrorMessage[] = []

  // For validation error
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(statusCode = error?.statusCode),
      (message = error?.message),
      (errorMessages = error?.message
        ? [{ path: '', message: error?.message }]
        : [])
  } else if (error instanceof Error) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(message = error?.message),
      (errorMessages = error?.message
        ? [{ path: '', message: error?.message }]
        : [])
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
