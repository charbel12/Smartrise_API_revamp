'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      middle_name: Sequelize.STRING,
      contact_number: Sequelize.STRING,
      password: Sequelize.STRING,
      password_salt: Sequelize.STRING,
      force_change_password: Sequelize.BOOLEAN,
      status: Sequelize.STRING,
      email: Sequelize.STRING,
      image: Sequelize.STRING,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      date_modified: Sequelize.DATE,
      remember_token: Sequelize.STRING
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
