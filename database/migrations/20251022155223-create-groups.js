'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groups", {
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
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("groups");
  }
};
