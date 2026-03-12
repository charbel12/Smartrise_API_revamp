'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevator_groups", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("elevator_groups");
  }
};
