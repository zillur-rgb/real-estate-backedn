import mongoose, { Schema } from 'mongoose'
import { IUser, UserModel } from '../types/user.interface'

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true },
)

export const User = mongoose.model<IUser, UserModel>('User', userSchema)
