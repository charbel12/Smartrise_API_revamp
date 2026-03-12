'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_security", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    schedule_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    floor_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    front_permission: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    rear_permission: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: false
    }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("car_security");
  }
};
