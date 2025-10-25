module.exports = (sequelize, DataTypes) => {
  const RptWait = sequelize.define('RptWait', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_id: { type: DataTypes.INTEGER, allowNull: false },
    direction: { type: DataTypes.STRING(255), allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
    wait_time: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'rpt_wait',
    timestamps: false,
  });
  return RptWait;
};
