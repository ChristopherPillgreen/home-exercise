import { Model, DataTypes } from "sequelize";
import sequelize from "./database";
export class Plan extends Model {}

Plan.init({ PlanID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false,
},
Frequency: {
  type: DataTypes.INTEGER,
  allowNull: false,
},
UserID: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Users',  // Name of the referenced table
    key: 'userID',        // Primary key column in Users table
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
},
Favorites: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,  // Set default value to false
},
}, {
tableName: 'Plan',
timestamps: false,  // Disable timestamps if not needed
})


Plan.associate = function(models) {
  Plan.belongsTo(models.User, {
    foreignKey: 'userID',
    as: 'user',
  });

Plan.belongsToMany(models.Exercise, {
  through: models.PlanExercises,
  foreignKey: 'PlanID',
  otherKey: 'exerciseID',
  as: 'exercises',
})
  return Plan;
};

  
export default Plan;