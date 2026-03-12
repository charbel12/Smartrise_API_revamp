module.exports = (sequelize, DataTypes) => {
  const ElevatorAlarm = sequelize.define('ElevatorAlarm', {

    alarm_number: { type: DataTypes.INTEGER, primaryKey: true },

    elevator_id: { type: DataTypes.INTEGER },

    alarm_description: { type: DataTypes.STRING(255) },
    alarm_solution: { type: DataTypes.STRING(255) },

    date_time: { type: DataTypes.DATE },

    alarm_name: { type: DataTypes.STRING(255) },

    alarm_destination: { type: DataTypes.INTEGER },
    alarm_floor: { type: DataTypes.INTEGER },

    alarm_floor_label: { type: DataTypes.STRING(255) },

    alarm_node: { type: DataTypes.STRING(255) },

    alarm_position: { type: DataTypes.STRING(255) },

    alarms_car_speed_fpm: { type: DataTypes.INTEGER },

    alarm_state: { type: DataTypes.INTEGER },
    alarms_command_speed_fpm: { type: DataTypes.INTEGER }
  }, {
    tableName: 'elevator_alarms',
    timestamps: false
  });

  return ElevatorAlarm;
};