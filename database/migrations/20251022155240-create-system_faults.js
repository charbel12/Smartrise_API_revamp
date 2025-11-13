'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("system_faults", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true 
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    tag: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    definition: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    solution: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    oos: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    construction: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    clear_type: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    clear_ccs: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    ("system_faults", { type: 'primary key', fields: ["id"] });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("system_faults");
  }
};
