module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    permission_id: { type: DataTypes.INTEGER, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: true },
    date_modified: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'roles_permissions',
    timestamps: false,
  });
  return RolePermission;
};
