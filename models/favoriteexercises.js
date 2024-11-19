import { Model, DataTypes } from 'sequelize';
import sequelize from './database'; // Adjust the path to your Sequelize instance

class FavoriteExercise extends Model {}

FavoriteExercise.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    exerciseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Exercises',
        key: 'exerciseID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'FavoriteExercises',
    timestamps: false,
  }
);

// Associations
FavoriteExercise.associate = (models) => {
  FavoriteExercise.belongsTo(models.User, {
    foreignKey: 'userID',
    as: 'user',
  });
  FavoriteExercise.belongsTo(models.Exercise, {
    foreignKey: 'exerciseID',
    as: 'exercise',
  });
};

export default FavoriteExercise;
