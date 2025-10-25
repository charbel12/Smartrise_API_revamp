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
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '0'
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
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    ordinal: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("elevator_floors");
  }
};
