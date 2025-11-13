'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_faults", {
    id: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true 
    },
    elevator_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    elevator_group_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fault_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    date_modified: {
      type: Sequelize.DATE,
      allowNull: true
    },
    fault_speed: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    fault_position: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    car_speed: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    car_position: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    floor_pi: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    last_fault_sync: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    floor_index: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    solution: {
      type: Sequelize.TEXT,
      allowNull: true
    }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rpt_faults");
  }
};
