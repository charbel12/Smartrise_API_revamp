'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_floortfloor", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    car_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    floor_from: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    floor_to: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    direction: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    wait_time: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    floor_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    state: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    mode_of_operation: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    class_of_operation: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    date_next: {
      type: Sequelize.DATE,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    secure_all: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: '1'
    },
    day_type: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    day_value: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ending_day: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    controls: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    start_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: true
    },
    end_date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("rpt_floortfloor");
  }
};
