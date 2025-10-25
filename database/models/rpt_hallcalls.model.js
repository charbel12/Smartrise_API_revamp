module.exports = (sequelize, DataTypes) => {
  const RptHallcall = sequelize.define('RptHallcall', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_id: { type: DataTypes.INTEGER, allowNull: false },
    direction: { type: DataTypes.STRING(255), allowNull: false },
    state: { type: DataTypes.INTEGER, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'rpt_hallcalls',
    timestamps: false,
  });
  return RptHallcall;
};
