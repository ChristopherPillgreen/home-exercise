'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TagExercises', {
      exerciseID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exercises', // Adjust this if the table name is different
          key: 'exerciseID'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      tagID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags', // Adjust this if the table name is different
          key: 'tagID'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TagExercises');
  }
};
