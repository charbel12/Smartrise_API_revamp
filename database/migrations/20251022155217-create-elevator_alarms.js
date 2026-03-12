'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("elevator_alarms", {
      alarm_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      elevator_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alarm_description: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alarm_solution: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      alarm_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alarm_destination: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alarm_floor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alarm_floor_label: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alarm_node: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alarm_position: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      alarms_car_speed_fpm: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alarm_state: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      alarms_command_speed_fpm: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    //await queryInterface.addIndex("elevator_alarms", ["id"], { name: "id", unique: true });
    //await queryInterface.addIndex("elevator_alarms", ["id"], { name: "elevator_alarms_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("elevator_alarms", "id");
    await queryInterface.removeIndex("elevator_alarms", "elevator_alarms_id_unique");
    await queryInterface.dropTable("elevator_alarms");
  }
};
