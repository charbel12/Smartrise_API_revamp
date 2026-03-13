'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop the table first if it exists to ensure clean slate with new schema
    await queryInterface.dropTable("rpt_floortofloor");

    await queryInterface.createTable("rpt_floortofloor", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      floor_from: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      floor_to: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      direction: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      wait_time: {
        type: Sequelize.FLOAT,
        allowNull: true
      }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rpt_floortofloor");
  }
};
