module.exports = (sequelize, DataTypes) => {
  const ElevatorFault = sequelize.define('ElevatorFault', {
    fault_number: { type: DataTypes.INTEGER, primaryKey: true },
    elevator_id: { type: DataTypes.INTEGER },
    date_time: { type: DataTypes.DATE },
    fault_position: { type: DataTypes.STRING(255) },
    fault_floor_label: { type: DataTypes.STRING(255) },
    fault_destination: { type: DataTypes.INTEGER },
    fault_floor: { type: DataTypes.INTEGER },
    fault_node: { type: DataTypes.STRING(255) },
    fault_car_speed_fpm: { type: DataTypes.INTEGER },
    fault_state: { type: DataTypes.INTEGER },
    fault_command_speed_fpm: { type: DataTypes.INTEGER },
    fault_name: { type: DataTypes.TEXT },
    fault_description: { type: DataTypes.TEXT },
    faults_solution: { type: DataTypes.TEXT }

  }, {
    tableName: 'elevator_faults',
    timestamps: false
  });

  return ElevatorFault;
};