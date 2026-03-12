'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevator_faults", {
      fault_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      elevator_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fault_position: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      fault_floor_label: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      fault_destination: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fault_floor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fault_node: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      fault_car_speed_fpm: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fault_state: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fault_command_speed_fpm: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fault_name: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fault_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      faults_solution: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    //await queryInterface.addIndex("elevator_faults", ["id"], { name: "id", unique: true });
    //await queryInterface.addIndex("elevator_faults", ["id"], { name: "elevator_faults_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("elevator_faults", "id");
    await queryInterface.removeIndex("elevator_faults", "elevator_faults_id_unique");
    await queryInterface.dropTable("elevator_faults");
  }
};
