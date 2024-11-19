import { Model, DataTypes } from "sequelize";
import { sequelize } from './database';

export class User extends Model {}


User.init({
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-incrementing primary key
  },
  userFirstName: {
    type: DataTypes.STRING(50), // Varchar with max length of 50
    allowNull: false, // Making this field required
  },
  userLastName: {
    type: DataTypes.STRING(50), // Varchar with max length of 50
    allowNull: false, // Making this field required
  },
  userEmail: {
    type: DataTypes.STRING(50), // Varchar with max length of 50
    allowNull: false, // Making this field required
    unique: true // Ensure email uniqueness
  },
  userPassword: {
    type: DataTypes.STRING(50), // Varchar with max length of 50
    allowNull: false, // Making this field required
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User', // Name of the table in the database
  timestamps: true // Optionally, add createdAt and updatedAt timestamps
});

export default User;


