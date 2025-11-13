'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rpt_services', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      group_id: Sequelize.INTEGER,
      car_id: Sequelize.INTEGER,
      floor_id: Sequelize.INTEGER,
      mode_of_operation: Sequelize.STRING,
      class_of_operation: Sequelize.STRING,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      date_next: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('rpt_services');
  }
};
