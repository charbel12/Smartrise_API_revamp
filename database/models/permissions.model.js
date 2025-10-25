module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: false },
    permission_group: { type: DataTypes.STRING(255), allowNull: false },
    url: { type: DataTypes.STRING(255), allowNull: true },
    feature: { type: DataTypes.STRING(255), allowNull: false },
    permission_function: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    display_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    display_customer: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    tableName: 'permissions',
    timestamps: false,
  });
  return Permission;
};
