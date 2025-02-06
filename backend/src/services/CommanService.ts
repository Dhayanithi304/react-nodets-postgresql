import bcrypt from 'bcryptjs'
import { NotFoundError } from '../utils/CustomError'

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

