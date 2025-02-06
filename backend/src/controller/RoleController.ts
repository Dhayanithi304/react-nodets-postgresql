import { Request, Response } from 'express'
import { getAllRoles, getRoleById, getRoleByRoleName, insertRole } from '../services/Role.service';
import { CustomError, NotFoundError, ValidationError } from '../utils/CustomError';
import {Role} from '../model/Role.modal';


const get_all = async (req: Request, res: Response) => {
    const users = await getAllRoles();
    res.sendResponse(users);
};
  
const get_one = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      throw new ValidationError("ID Not Found");
    }
    try {
      const role = await getRoleById(id);
      if (!role) {
        throw new NotFoundError("Role Not Found");
      }
      // role.userId = '8162cc75-f349-4cc1-9287-d505719c8b3f'
      await role.save()
      res.sendResponse(role);
    } catch (error) {
      console.error("Error creating role:", error);
      throw new CustomError(`Internal server error`, 500)
    }
};  // Custom error class
  

const insert_role = async (req: Request, res: Response) => {
    const { role_name } = req.body

    if(!role_name){
        res.status(400).json({error: "role not given"})
        return 
    }

    try {
    // Check if user already exists
    const existRole = await getRoleByRoleName(role_name);
    
    if (existRole) {
      throw new CustomError("Role already exists", 400);  // User already exists
    }

    // Create new user
    const newRole = await insertRole({ name: role_name });

    // Return response
    if(newRole){
      res.status(201).json({ id: newRole.id });
    }

  } catch (error) {
    // Pass error to the error middleware
    console.error("Error creating role:", error);
    // next(error);  // Ensure we pass the error to the error middleware
  }
}

export {
    insert_role, get_all, get_one
}