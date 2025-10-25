'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevators", {
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
    beaglebone_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    manufactured_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    installation_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    warranty_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    latitude: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    longitude: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    location: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    capacity: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    width: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    length: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    height: {
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
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    max_floors: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total_height: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    num_floors: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("elevators");
  }
};
