'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
    id: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true 
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    display_admin: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    display_customer: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '0'
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: false
    },
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    //await queryInterface.addIndex("roles", ["id"], { name: "rpt_alarms_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("roles", "rpt_alarms_id_unique");
    await queryInterface.dropTable("roles");
  }
};
