'use strict';
const { Model } = require('sequelize');
import {Model, DataTypes} from 'sequelize';
import sequelize from './databaseInstance';
import sequelize from './database';
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Exercise, {
        through: 'TagExercise',      // Join table name
        foreignKey: 'tagID',         // Foreign key for Tag in the join table
        as: 'exercises'              // Alias to access associated Exercises
      });
    }
  }
  
  Tag.init(
    {
      tagID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tagName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'Tags', // Explicitly specify the table name if needed
      timestamps: false  // Set to false if you don't need createdAt/updatedAt
    }
  );

  return Tag;
};
export default Tag;
