module.exports = (sequelize, DataTypes) => {
  const ControlSetting = sequelize.define('ControlSetting', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    car_id: { type: DataTypes.BIGINT, allowNull: true },
    group_id: { type: DataTypes.BIGINT, allowNull: true },
    name: { type: DataTypes.STRING(255), allowNull: true },
    value: { type: DataTypes.STRING(255), allowNull: true },
    created_by: { type: DataTypes.STRING(255), allowNull: true },
    updated_by: { type: DataTypes.STRING(255), allowNull: true },
    date_created: { type: DataTypes.DATE, allowNull: true },
    date_modified: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'control_settings',
    timestamps: false,
  });
  return ControlSetting;
};
