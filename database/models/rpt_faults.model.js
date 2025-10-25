module.exports = (sequelize, DataTypes) => {
  const RptFault = sequelize.define('RptFault', {
    id: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false },
    elevator_id: { type: DataTypes.INTEGER, allowNull: false },
    elevator_group_id: { type: DataTypes.INTEGER, allowNull: false },
    fault_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    date_created: { type: DataTypes.DATE, allowNull: false },
    fault_speed: { type: DataTypes.DOUBLE, allowNull: false },
    fault_position: { type: DataTypes.STRING(255), allowNull: false },
    car_speed: { type: DataTypes.DOUBLE, allowNull: true },
    car_position: { type: DataTypes.STRING(255), allowNull: true },
    floor_pi: { type: DataTypes.STRING(255), allowNull: true },
    floor_index: { type: DataTypes.STRING(255), allowNull: true },
    name: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    solution: { type: DataTypes.TEXT, allowNull: true },
  }, {
    tableName: 'rpt_faults',
    timestamps: false,
  });
  return RptFault;
};
