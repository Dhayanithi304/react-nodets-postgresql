import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Role } from './Role.modal';

interface UserAttributes {
  id: number;  // Change from UUID to INTEGER
  username: string;
  password: string;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  setRoles(rolesArray: import("./Role.modal").Role[]) {
    throw new Error("Method not implemented.");
  }
  public id!: number;  // Change from string (UUID) to number (INTEGER)
  public username!: string;
  public password!: string;
  public name!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Enable auto-increment
      primaryKey: true,     // Mark as primary key
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'User',
  }
);

User.belongsToMany(Role, {
  through: 'UserRole',  
  foreignKey: 'userId',
  otherKey: 'roleId',
});

const truncateRolesTable = async () => {
  try {
    await sequelize.query('TRUNCATE TABLE "Roles" RESTART IDENTITY CASCADE;');
    console.log('Roles table truncated successfully.');
  } catch (error) {
    console.error('Error truncating roles table:', error);
  }
};

// truncateRolesTable();

export { User };
