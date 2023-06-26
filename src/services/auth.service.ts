import { IUser } from './../types/user.interface'
import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import config from '../config/config'
import jwt from 'jsonwebtoken'

const registerService = async (
  payload: IUser,
): Promise<{
  newUser: IUser | null
  token: string
}> => {
  const isExisted = await User.findOne({ email: payload.email })

  if (isExisted)
    throw new ApiError(httpStatus.NOT_FOUND, 'User is already registered')

  const hashedPassword = await bcrypt.hash(payload.password, 10)
  const newUser = await User.create({ ...payload, password: hashedPassword })

  const token = jwt.sign({ id: newUser._id }, config.jwtSecret as string, {
    expiresIn: '1d',
  })

  return { newUser, token }
}

// ===== login services =======
const loginService = async (payload: {
  email: string
  password: string
}): Promise<{
  data: IUser | null
  token: string | null
}> => {
  const user = await User.findOne({ email: payload.email })
  console.log('User', payload)

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')

  const ifMatchedPassword = await bcrypt.compare(
    payload.password,
    user.password,
  )

  if (!ifMatchedPassword) throw new Error('Wrong credentials! Try again')
  const token = jwt.sign({ id: user._id }, config.jwtSecret as string, {
    expiresIn: '1d',
  })

  return { data: user, token }
}

export const AuthService = {
  registerService,
  loginService,
}
