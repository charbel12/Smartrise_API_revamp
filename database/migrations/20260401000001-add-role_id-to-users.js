'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add role_id column to users
    await queryInterface.addColumn('users', 'role_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
    });

    // 2. Backfill role_id from user_roles (SQLite compatible)
    await queryInterface.sequelize.query(`
      UPDATE users
      SET role_id = (
        SELECT role_id FROM user_roles
        WHERE user_roles.user_id = users.id
        LIMIT 1
      )
    `);

    // 3. Drop the now-redundant user_roles table
    await queryInterface.dropTable('user_roles');
  },

  async down(queryInterface, Sequelize) {
    // 1. Re-create user_roles table
    await queryInterface.createTable('user_roles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER,
      role_id: Sequelize.INTEGER,
      date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      date_modified: Sequelize.DATE,
    });

    // 2. Restore data from users.role_id
    await queryInterface.sequelize.query(`
      INSERT INTO user_roles (user_id, role_id, date_created, date_modified)
      SELECT id, role_id, date_created, date_modified
      FROM users
      WHERE role_id IS NOT NULL
    `);

    // 3. Remove role_id from users
    await queryInterface.removeColumn('users', 'role_id');
  },
};
