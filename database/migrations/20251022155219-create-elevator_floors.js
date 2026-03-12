'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevator_floors", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    floor_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    door_side: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    ordinal: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("elevator_floors");
  }
};
