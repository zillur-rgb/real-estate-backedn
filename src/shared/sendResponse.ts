import { Response } from 'express'

interface IApiResponse<T> {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
  token?: string | null
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data,
    token: data.token,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse
