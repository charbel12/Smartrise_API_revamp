module.exports = (sequelize, DataTypes) => {
  const RptCarcall = sequelize.define('RptCarcall', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    car_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_id: { type: DataTypes.INTEGER, allowNull: false },
    state: { type: DataTypes.INTEGER, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'rpt_carcalls',
    timestamps: false,
  });
  return RptCarcall;
};
