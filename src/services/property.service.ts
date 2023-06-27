import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
import { Property } from '../models/property.model'
import { IProperty } from '../types/property.interface'

// ==== GET ALL PROPERTIES ====
const getAll = async (): Promise<IProperty[]> => {
  const properties = await Property.find({}).populate(
    'currentOwner',
    '-password',
  )

  return properties
}

// ==== GET FEATURED ====
const getFeatured = async (): Promise<IProperty[]> => {
  const featuredProperties = await Property.find({ featured: true }).populate(
    'currentOwner',
    '-password',
  )

  return featuredProperties
}

// ==== GET ALL FROM TYPE ====
const getAllFromType = async (type: string): Promise<IProperty[]> => {
  let properties = []

  if (type) {
    properties = await Property.find({ type: type }).populate(
      'owner',
      '-password',
    )
  } else {
    properties = await Property.find({})
  }

  return properties
}

// ==== Featch individuals property ====
const findMyProperties = async (
  userId: string,
): Promise<IProperty[] | null> => {
  const properties = await Property.find({ currentOwner: userId })
  return properties
}

// ==== Fetch Bookmarked property =====
const bookmarkedProperties = async (
  userId: string,
): Promise<IProperty[] | null> => {
  const properties = await Property.find({ bookmarkedUsers: { $in: [userId] } })
  return properties
}

// ===== Fetch Individual Property ====
const singleProperty = async (id: string): Promise<IProperty | null> => {
  const property = await Property.findById(id).populate(
    'currentOwner',
    'password',
  )

  if (!property)
    throw new ApiError(httpStatus.NOT_FOUND, 'No property found with this id')
  return property
}

// ==== Create Property ====
const createProprty = async (
  payload: IProperty,
  userId: string,
): Promise<IProperty> => {
  const newProperty = await Property.create({
    ...payload,
    currentOwner: userId,
  })

  return newProperty
}

// ==== UPDATE PROPERTY ====
const updateProperty = async (
  id: string,
  userId: string,
  payload: Partial<IProperty>,
): Promise<IProperty | null> => {
  const property = await Property.findById(id)
  if (property?.currentOwner.toString() !== userId)
    throw new Error('You are not allowed to update the property')
  const updatedPropety = await Property.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  )
  return updatedPropety
}

// Bookmark and remove bookmark
const BookmarkProperty = async (
  id: string,
  userId: string,
): Promise<IProperty | null> => {
  const property = await Property.findById(id)
  if (property?.currentOwner.toString() !== userId)
    throw new Error('You are not allowed to make this change')
  if (property.bookmarkedUsers.includes(userId)) {
    property.bookmarkedUsers = property.bookmarkedUsers.filter(
      (id) => id !== id,
    )
    await property.save()
  } else {
    property.bookmarkedUsers.push(userId)
    await property.save()
  }

  return property
}

// ==== DELETE PROPERTY ====
const deleteProperty = async (id: string): Promise<IProperty | null> => {
  const property = await Property.findById(id)
  if (property?.currentOwner.toString() !== id)
    throw new Error('YOu are not allowed to do this!')
  await Property.findByIdAndDelete(id)
  return property
}

export const PropertyService = {
  getAll,
  getFeatured,
  getAllFromType,
  findMyProperties,
  bookmarkedProperties,
  singleProperty,
  createProprty,
  updateProperty,
  BookmarkProperty,
  deleteProperty,
}
