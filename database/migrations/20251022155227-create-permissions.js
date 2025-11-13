'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    permission_group: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    feature: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    permission_function: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false
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
    display_admin: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: '1'
    },
    display_customer: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: '0'
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("permissions");
  }
};
