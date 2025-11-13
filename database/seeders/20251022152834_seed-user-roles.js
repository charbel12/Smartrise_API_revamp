'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const data = [
  {
    "id": "1",
    "user_id": "1",
    "role_id": "1",
    "date_created": "2019-07-31 18:00:00",
    "date_modified": "2019-07-31 18:00:00"
  },
  {
    "id": "2",
    "user_id": "2",
    "role_id": "4",
    "date_created": "2019-07-31 18:00:00",
    "date_modified": "2019-07-31 18:00:00"
  },
  {
    "id": "3",
    "user_id": "3",
    "role_id": "5",
    "date_created": "2019-07-31 18:00:00",
    "date_modified": "2019-07-31 18:00:00"
  },
  {
    "id": "4",
    "user_id": "4",
    "role_id": "2",
    "date_created": "2019-07-31 18:00:00",
    "date_modified": "2019-07-31 18:00:00"
  },
  {
    "id": "5",
    "user_id": "5",
    "role_id": "3",
    "date_created": "2019-07-31 18:00:00",
    "date_modified": "2019-07-31 18:00:00"
  }
].map(r => ({...r, date_created: r.date_created ?? now, date_modified: r.date_modified ?? now}));
    await queryInterface.bulkInsert('user_roles', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
