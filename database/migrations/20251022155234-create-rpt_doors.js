'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_doors", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      group_id: Sequelize.INTEGER,
      car_id: Sequelize.INTEGER,
      floor_id: Sequelize.INTEGER,
      door_state: Sequelize.STRING,
      opening: Sequelize.BOOLEAN,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      time_sec: Sequelize.FLOAT
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("elevator_faults", "id");
    await queryInterface.removeIndex("elevator_faults", "elevator_faults_id_unique");
    await queryInterface.dropTable("elevator_faults");
  }
};
