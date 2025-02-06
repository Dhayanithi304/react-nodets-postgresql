import { Request, Response } from "express";
import {User} from "../model/User.model";
import { getAllUsers, getUserById, getUserByUsername } from "../services/User.service";
import { CustomError, NotFoundError, ValidationError } from "../utils/CustomError";
import { Role } from "../model/Role.modal";
import { sequelize } from "../config/db";
import { Sequelize } from "sequelize";

const get_all = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.sendResponse(users);
  } catch (error) {
    console.error("Error occrered:", error);
  }
};

const get_one = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    throw new ValidationError("ID Not Found");
  }
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }
    const ouser = await getUserById("8162cc75-f349-4cc1-9287-d505719c8b3f")
    // user?.roleId = ""
    res.sendResponse(user);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new CustomError(`Internal server error`, 500)
  }
};  // Custom error class

const create_user = async (req: Request, res: Response) => {
  const { username, password, confirm_password, name, roles } = req.body;

  try {
    // Validate request body
    if (!username) {
      throw new CustomError("Username not given", 400);  // Custom validation error
    }
    if (!password) {
      throw new CustomError("Password not given", 400);  // Custom validation error
    }
    if (!confirm_password) {
      throw new CustomError("Confirm password not given", 400);  // Custom validation error
    }
    if (!name) {
      throw new CustomError("Name not given", 400);  // Custom validation error
    }
    if (!roles) {
      throw new CustomError("Role not given", 400);  // Custom validation error
    }
    if (password !== confirm_password) {
      throw new CustomError("Password and confirm password do not match", 400);  // Password mismatch
    }

    // Check if user already exists
    const existUser = await getUserByUsername(username);
    if (existUser) {
      throw new CustomError("User already exists", 400);  // User already exists
    }

    // Create new user
    const newUser = await User.create({
      username,
      password,
      name,
    });

    if (roles && roles.length > 0) {
      const rolesArray = await Role.findAll({
        where: {
          id: roles,
        },
      });
      await newUser.setRoles(rolesArray); // Associate the user with the roles
    }

    // Return response
    res.status(201).json({ id: newUser.id });

  } catch (error) {
    // Pass error to the error middleware
    console.error("Error creating user:", error);
    // next(error);  // Ensure we pass the error to the error middleware
  }
};

const create_user2 = async (req: Request, res: Response) => {
  const { username, password, confirm_password, name, roles } = req.body;

  try {
    // Validate request body
    if (!username) {
      throw new CustomError("Username not given", 400);  // Custom validation error
    }
    if (!password) {
      throw new CustomError("Password not given", 400);  // Custom validation error
    }
    if (!confirm_password) {
      throw new CustomError("Confirm password not given", 400);  // Custom validation error
    }
    if (!name) {
      throw new CustomError("Name not given", 400);  // Custom validation error
    }
    if (!roles) {
      throw new CustomError("Role not given", 400);  // Custom validation error
    }
    if (password !== confirm_password) {
      throw new CustomError("Password and confirm password do not match", 400);  // Password mismatch
    }

    // Check if user already exists
    const existUser = await getUserByUsername(username);
    if (existUser) {
      throw new CustomError("User already exists", 400);  // User already exists
    }

    // Create new user
    const newUser = await sequelize.query("CALL insert_user(:username, :password, :name) returing result;", {
      replacements: {
        username,
        password,
        name,
        result: null
      },
      type: sequelize.QueryTypes.RAW
    }) 

    // Return response
    // res.status(201).json({ id: newUser.id });

  } catch (error) {
    // Pass error to the error middleware
    console.error("Error creating user:", error);
    // next(error);  // Ensure we pass the error to the error middleware
  }
};


export { create_user, get_all, get_one };
