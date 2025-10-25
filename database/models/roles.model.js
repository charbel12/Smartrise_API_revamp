module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.TINYINT, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: false },
    display_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    display_customer: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'roles',
    timestamps: false,
  });
  return Role;
};
