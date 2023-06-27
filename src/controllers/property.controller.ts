import { Request, Response } from 'express'
import catchAsync from '../shared/catchAsync'
import { PropertyService } from '../services/property.service'
import sendResponse from '../shared/sendResponse'
import httpStatus from 'http-status'

// Define a custom interface that extends the default Request interface
interface CustomRequest extends Request {
  user?: { userId: string } // Add the user property to the interface
}

// Get all controller
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getAll()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All data fetched successfully',
    data: result,
  })
})

// ==== GET FEATURED ====
const getFeatured = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getFeatured()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All data fetched successfully',
    data: result,
  })
})

// ===== GET MY PROPERTIES ====
const getMyProperties = catchAsync(
  async (req: CustomRequest, res: Response) => {
    console.log('req.body.user', req.body.user)

    const result = await PropertyService.findMyProperties(req?.body?.user)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All data fetched successfully',
      data: result,
    })
  },
)

// ==== Find individual Property ====
const findSingleProperty = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const result = await PropertyService.singleProperty(req.params.id)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All data fetched successfully',
      data: result,
    })
  },
)

// ==== Create Property =====
const createProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.createProprty(req.body, req.body.user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Property created successfully',
    success: true,
    data: result,
  })
})

// ==== Update Property ====
const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.updateProperty(
    req.params.id,
    req.body.user,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Property updated successfully',
    success: true,
    data: result,
  })
})

// ==== delete individual Property ====
const deleteSingleProperty = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const result = await PropertyService.deleteProperty(req.params.id)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All data was deleted successfully',
      data: result,
    })
  },
)

export const PropertyController = {
  getAll,
  createProperty,
  getFeatured,
  getMyProperties,
  findSingleProperty,
  updateProperty,
  deleteSingleProperty,
}
