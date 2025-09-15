module.exports = {
  async up(q, Sequelize) {
    await q.createTable('old_permissions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      code: { type: Sequelize.STRING(100), allowNull: false,},
      permission_group: { type: Sequelize.STRING(100), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

   
  },

  async down(q) {
  
    await q.dropTable('old_permissions');
  },
};
