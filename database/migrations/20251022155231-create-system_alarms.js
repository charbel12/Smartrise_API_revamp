'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("system_alarms", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    tag: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    definition: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    solution: {
      type: Sequelize.TEXT,
      allowNull: false
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    ("system_alarms", { type: 'primary key', fields: ["id"] });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("system_alarms");
  }
};
