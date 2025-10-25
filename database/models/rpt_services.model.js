module.exports = (sequelize, DataTypes) => {
  const RptService = sequelize.define('RptService', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    car_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_id: { type: DataTypes.INTEGER, allowNull: false },
    mode_of_operation: { type: DataTypes.INTEGER, allowNull: false },
    class_of_operation: { type: DataTypes.INTEGER, allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_next: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'rpt_services',
    timestamps: false,
  });
  return RptService;
};
