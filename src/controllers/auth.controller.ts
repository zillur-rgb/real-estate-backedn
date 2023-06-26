import httpStatus from 'http-status'
import catchAsync from '../shared/catchAsync'
import { Request, RequestHandler, Response } from 'express'
import { AuthService } from '../services/auth.service'
import sendResponse from '../shared/sendResponse'

const register: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.registerService(req.body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered succesfully',
      data: result,
    })
  },
)

// ==== LOGIN ====
const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.loginService(req.body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Logged in succesfully',
      data: result,
    })
  },
)

export const AuthController = {
  register,
  login,
}
