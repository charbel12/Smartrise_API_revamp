'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("control_settings", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    car_id: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    group_id: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    value: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    created_by: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    updated_by: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: true
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("control_settings");
  }
};
