'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const data = [
  {
    "id": "1",
    "user_id": "1",
    "role_id": "1",
    "createdAt": "2019-07-31 18:00:00",
    "updatedAt": "2019-07-31 18:00:00"
  },
  {
    "id": "2",
    "user_id": "2",
    "role_id": "4",
    "createdAt": "2019-07-31 18:00:00",
    "updatedAt": "2019-07-31 18:00:00"
  },
  {
    "id": "3",
    "user_id": "3",
    "role_id": "5",
    "createdAt": "2019-07-31 18:00:00",
    "updatedAt": "2019-07-31 18:00:00"
  },
  {
    "id": "4",
    "user_id": "4",
    "role_id": "2",
    "createdAt": "2019-07-31 18:00:00",
    "updatedAt": "2019-07-31 18:00:00"
  },
  {
    "id": "5",
    "user_id": "5",
    "role_id": "3",
    "createdAt": "2019-07-31 18:00:00",
    "updatedAt": "2019-07-31 18:00:00"
  }
].map(r => ({...r, createdAt: r.createdAt ?? now, updatedAt: r.updatedAt ?? now}));
    await queryInterface.bulkInsert('user_roles', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
