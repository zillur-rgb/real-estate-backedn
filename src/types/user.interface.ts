import { Model } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  profileImg: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
