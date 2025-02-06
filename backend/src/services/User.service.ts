import {Role} from "../model/Role.modal";
import {User} from "../model/User.model";

export const getUserByUsername = async (username: any) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] }, // Exclude password field
    // include: [
    //   {
    //     model: Role, // Include the Role model
    //     attributes: ["role_name"], // Include only specific fields of Role
    //     through: { attributes: [] }, // Exclude the junction table columns
    //   },
    // ],
  });

//   const transformedUsers = users.map((user) => {
//     const roles = (user as any).roles.map(
//       (role: { role_name: string }) => role.role_name
//     ); // Extract role names
//     return {
//       ...user.get(), // Get the plain user data
//       roles, // Add the roles as an array of strings
//     };
//   });

  return users;
};

export const getUserById = async (id: any) => {
  return await User.findOne({
    where: { id },
    include: Role,
  });
};
