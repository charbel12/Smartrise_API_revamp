'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles_permissions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      role_id: Sequelize.INTEGER,
      permission_id: Sequelize.INTEGER,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      date_modified: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('roles_permissions');
  }
};
