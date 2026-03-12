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
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    display_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    display_customer: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("permissions");
  }
};
