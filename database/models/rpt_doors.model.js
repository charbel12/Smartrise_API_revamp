module.exports = (sequelize, DataTypes) => {
  const RptDoor = sequelize.define('RptDoor', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    car_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_id: { type: DataTypes.INTEGER, allowNull: false },
    door_state: { type: DataTypes.STRING(255), allowNull: false },
    opening: { type: DataTypes.TEXT, allowNull: true },
    date_created: { type: DataTypes.DATE, allowNull: false },
    time_sec: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'rpt_doors',
    timestamps: false,
  });
  return RptDoor;
};
