'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER,
      role_id: Sequelize.INTEGER,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      date_modified: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_roles');
  }
};
