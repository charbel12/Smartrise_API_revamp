module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: true },
    date_modified: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'user_roles',
    timestamps: false,
  });
  return UserRole;
};
