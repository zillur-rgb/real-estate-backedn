import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config/config'
import httpStatus from 'http-status'
import sendResponse from '../shared/sendResponse'

// Define a custom interface that extends the default Request interface
interface CustomRequest extends Request {
  user?: { userId: string } // Add the user property to the interface
}

const verifyJwt = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization as string

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No auth header found',
    })
  }

  const token = authHeader?.split(' ')[1]
  try {
    const payload = jwt.verify(token, config.jwtSecret as string) as JwtPayload
    req.body.user = { userId: payload.userId }
    next()
  } catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Token verification failed',
    })
  }
}
export default verifyJwt
