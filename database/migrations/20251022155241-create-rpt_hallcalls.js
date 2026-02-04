'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_hallcalls", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      floor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      direction: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rpt_hallcalls");
  }
};
