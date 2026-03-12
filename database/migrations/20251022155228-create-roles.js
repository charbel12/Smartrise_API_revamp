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
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    display_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    display_customer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: false
    }
    });
    //await queryInterface.addIndex("roles", ["id"], { name: "rpt_alarms_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("roles", "rpt_alarms_id_unique");
    await queryInterface.dropTable("roles");
  }
};
