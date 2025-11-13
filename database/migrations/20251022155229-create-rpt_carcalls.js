'use strict';

/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rpt_carcalls", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      car_id: {
        type: Sequelize.INTEGER
      },
      floor_id: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, { engine: "InnoDB", charset: "utf8mb4", collate: "utf8mb4_unicode_ci" });
    //await queryInterface.addIndex("rpt_carcalls", ["id"], { name: "rpt_faults_id_unique", unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("rpt_carcalls", "rpt_faults_id_unique");
    await queryInterface.dropTable("rpt_carcalls");
  }
};
