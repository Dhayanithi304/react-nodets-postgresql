import User from "../model/User.model"

export const getUserByUsername = async (username: any) => {
    const user = await User.findOne({ where: { username } })
    return user
}

export const getAllUsers = async () => {
    return await User.findAll()
}

export const getUserById = async (id: any) => {
    return await User.findOne({ where: { id } })
}