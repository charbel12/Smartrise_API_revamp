module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    name: { type: DataTypes.STRING(32), primaryKey: true, allowNull: false },
    value: { type: DataTypes.STRING(255), allowNull: false },
  }, {
    tableName: 'settings',
    timestamps: false,
  });
  return Setting;
};
