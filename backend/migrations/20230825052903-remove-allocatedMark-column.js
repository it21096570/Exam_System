'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('papers', 'alloctedMarks');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('papers', 'alloctedMarks', {
      type: Sequelize.INTEGER
      // Add other column configuration options here
    });
  }
};

