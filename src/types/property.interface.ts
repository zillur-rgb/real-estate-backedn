import { Model, Types } from 'mongoose'
import { IUser } from './user.interface'

export interface IProperty {
  currentOwner: IUser | Types.ObjectId
  title: string
  type: string
  desc: string
  img: string
  price: number
  sqmeters: number
  continent: string
  beds: number
  bookmarkedUsers: string[]
}

export type PropertyModel = Model<IProperty, Record<string, unknown>>
