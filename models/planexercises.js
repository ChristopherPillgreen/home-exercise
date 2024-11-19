import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
export class PlanExercises extends Model {}

PlanExercises.init({
  planExerciseId: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  planID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Plan',  // Name of the Plan table
      key: 'PlanID'    // Primary key in the Plan table (corrected from 'id' to 'planID')
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  exerciseID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exercises', // Name of the Exercise table
      key: 'exerciseID'   // Primary key in the Exercise table
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(50),  // Equivalent to VARCHAR(50)
    allowNull: false
  },
  time: {
    type: DataTypes.STRING(50),  // Equivalent to VARCHAR(50)
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'PlanExercises',
  tableName: 'PlanExercises',  // Specify the table name
  timestamps: false  // No timestamps needed for this join table
})

PlanExercises.associate = (models) => {
  PlanExercises.belongsTo(models.Plan, {
    foreignKey: "PlanID",
    as: "plan",
  });

  PlanExercises.belongsTo(models.Exercise, {
    foreignKey: "exerciseID",
    as: "exercise",
  });
};
export default PlanExercises;