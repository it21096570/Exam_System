'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('papers', 'alloctedMarks', {
      type: Sequelize.STRING, // Change the data type to STRING
      allowNull: false, // Adjust this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('papers', 'alloctedMarks', {
      type: Sequelize.INTEGER, // Revert the data type to INTEGER in the down migration
      allowNull: false, // Adjust this based on your requirements
    });
  },
};
  
