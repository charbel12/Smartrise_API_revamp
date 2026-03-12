'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const data = [
      {
        "id": 1,
        "name": "Smartrise Admin",
        "status": true,
        "display_admin": true,
        "display_customer": false
      },
      {
        "id": 2,
        "name": "Servicing Admin",
        "status": true,
        "display_admin": true,
        "display_customer": false
      },
      {
        "id": 3,
        "name": "Site Admin",
        "status": true,
        "display_admin": true,
        "display_customer": false
      },
      {
        "id": 4,
        "name": "User Admin",
        "status": true,
        "display_admin": true,
        "display_customer": false
      },
      {
        "id": 5,
        "name": "User",
        "status": true,
        "display_admin": true,
        "display_customer": false
      }
    ].map(r => ({ ...r, date_created: r.date_created ?? now, date_modified: r.date_modified ?? now }));
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkInsert('roles', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
