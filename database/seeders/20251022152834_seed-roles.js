'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const data = [
  {
    "id": 1,
    "name": "Smartrise Admin",
    "status": 1,
    "display_admin": 1,
    "display_customer": 0
  },
  {
    "id": 2,
    "name": "Servicing Admin",
    "status": 1,
    "display_admin": 1,
    "display_customer": 0
  },
  {
    "id": 3,
    "name": "Site Admin",
    "status": 1,
    "display_admin": 1,
    "display_customer": 0
  },
  {
    "id": 4,
    "name": "User Admin",
    "status": 1,
    "display_admin": 1,
    "display_customer": 0
  },
  {
    "id": 5,
    "name": "User",
    "status": 1,
    "display_admin": 1,
    "display_customer": 0
  }
].map(r => ({ ...r, date_created: r.date_created ?? now, date_modified: r.date_modified ?? now }));
    await queryInterface.bulkInsert('roles', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
