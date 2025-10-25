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
    },
    oos: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false
    },
    construction: {
      type: Sequelize.ENUM('Mechanical', 'Electrical', 'Both'),
      allowNull: false
    },
    clear_type: {
      type: Sequelize.ENUM('Manual', 'Automatic'),
      allowNull: false
    },
    clear_ccs: {
      type: Sequelize.ENUM('Required', 'NotRequired'),
      allowNull: false
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    key: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    value: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    ("system_alarms", { type: 'primary key', fields: ["id"] });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("system_alarms");
  }
};
