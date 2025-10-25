'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_carcalls", {
    id: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true 
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    car_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    floor_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    state: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    date_created: {
      type: Sequelize.DATE,
      allowNull: false
    },
    door_state: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    opening: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    time_sec: {
      type: Sequelize.INTEGER,
      allowNull: true
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
    fault_speed: {
      type: Sequelize.DOUBLE,
      allowNull: false
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
    floor_index: {
      type: Sequelize.STRING(255),
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
    //await queryInterface.addIndex("rpt_carcalls", ["id"], { name: "rpt_faults_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("rpt_carcalls", "rpt_faults_id_unique");
    await queryInterface.dropTable("rpt_carcalls");
  }
};
