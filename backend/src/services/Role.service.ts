import {Role} from "../model/Role.modal"

export const getRoleByRoleName = async (name: string) => {
    return await Role.findOne({where: { name } })
}

export const getAllRoles = async () => {
    return await Role.findAll()
}

export const getRoleById = async (id: any) => {
    return await Role.findOne({ where: { id } })
}

export const insertRole = async (role: any) => {
    return await Role.create(role)
}