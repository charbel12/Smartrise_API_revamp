'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      name: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });

    // Seed default values
    const now = new Date();
    await queryInterface.bulkInsert('settings', [
      { name: 'site_id', value: '1' },
      { name: 'remote_monitoring_status', value: '0' },
      { name: 'carcall_special_feature', value: '0' },
      { name: 'hallcall_special_feature', value: '0' },
      { name: 'remote_url', value: 'wss://monitoring.smartrise.us:3000/' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};
