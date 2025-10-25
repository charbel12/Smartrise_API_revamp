module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'groups',
    timestamps: false,
  });
  return Group;
};
