module.exports = (sequelize, DataTypes) => {
  const ElevatorFault = sequelize.define('ElevatorFault', {
    id: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false },
    elevator_id: { type: DataTypes.INTEGER, allowNull: false },
    elevator_group_id: { type: DataTypes.INTEGER, allowNull: false },
    fault_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: true },
    fault_speed: { type: DataTypes.DOUBLE, allowNull: true },
    fault_position: { type: DataTypes.STRING(255), allowNull: false },
    car_speed: { type: DataTypes.DOUBLE, allowNull: true },
    car_position: { type: DataTypes.STRING(255), allowNull: true },
    floor_pi: { type: DataTypes.STRING(255), allowNull: true },
    floor_index: { type: DataTypes.TEXT, allowNull: true },
    name: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    solution: { type: DataTypes.TEXT, allowNull: true },
  }, {
    tableName: 'elevator_faults',
    timestamps: false,
  });
  return ElevatorFault;
};
