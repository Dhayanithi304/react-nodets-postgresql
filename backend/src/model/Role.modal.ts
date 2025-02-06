import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


class Role extends Model {
  public id!: number;  // Change from UUID to INTEGER
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Enable auto-increment
      primaryKey: true,     // Mark as primary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'Role',
  }
);

export { Role };
