'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("beaglebones", {
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
    mac_address: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    manufactured_date: {
      type: Sequelize.DATEONLY,
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
    }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("beaglebones");
  }
};
