'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("maintenance_logs", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    ticket_no: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    error_code: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    fault_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    error_description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    maintenance_date: {
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
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("maintenance_logs");
  }
};
