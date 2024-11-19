// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "./database";
// export class Exercise extends Model {}

// Exercise.init({
//   exerciseID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   exerciseName: {
//     type: DataTypes.STRING,
//     allowNull: false // Make this required
//   },
//   exerciseDescription: {
//     type: DataTypes.STRING,
//     allowNull: false // Make this required
//   },
//   exerciseImage: {
//     type: DataTypes.BLOB("long"),
//     allowNull: true,
//   },
// }, {
//   sequelize,
//   modelName: 'Exercise',
//   tableName: 'Exercises', // Specify the table name
//   timestamps: false,
// })

// Exercise.associate = (models) => {
//   Exercise.belongsToMany(models.Plan, {
//     through: models.PlanExercises,
//     foreignKey: 'exerciseID',
//     as: 'plans'
//   });

//   Exercise.belongsToMany(models.Tag, {
//     through: 'TagExercise',
//     foreignKey: 'exerciseID',
//     as: 'tags'
//   });
// };
// export default Exercise;
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

export class Exercise extends Model {
  static associate(models) {
    // Define associations with Plan
    Exercise.belongsToMany(models.Plan, {
      through: models.PlanExercises, // Join table
      foreignKey: "exerciseID",      // Foreign key in join table
      as: "plans",                   // Alias for associated Plans
    });

    // Define associations with Tag
    Exercise.belongsToMany(models.Tag, {
      through: models.TagExercises, // Join table
      foreignKey: "exerciseID",     // Foreign key in join table
      as: "tags",                   // Alias for associated Tags
    });
  }
}

Exercise.init(
  {
    exerciseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exerciseName: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    exerciseDescription: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    exerciseImage: {
      type: DataTypes.BLOB("long"), // Long blob for large binary data
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Exercise",
    tableName: "Exercises", // Matches database table name
    timestamps: false,      // No createdAt/updatedAt fields
  }
);

Exercise.sync({ force: true }).then(() => console.log("DONE!!")).catch((err) => console.error(err))

export default Exercise;
