'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hall_security", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    direction: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    schedule_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: true
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
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    rear_permission: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: false
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("hall_security");
  }
};
