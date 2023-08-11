'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'questionNo', {
      type: Sequelize.INTEGER, // Adjust the data type as needed
      notNull: true, // Adjust this based on your requirements
    });
  },
};

