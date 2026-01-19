module.exports = (sequelize, DataTypes) => {
  const ElevatorAlarm = sequelize.define(
    'ElevatorAlarm',
    {
      alarm_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      which_car: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      alarm_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      alarm_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      alarm_solution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      alarm_destination: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      alarm_floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      alarm_floor_label: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      alarm_node: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      alarm_position: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      alarms_car_speed_fpm: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },

      alarms_command_speed_fpm: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },

      alarm_state: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'alarms_alarm',
      timestamps: false,
    }
  );

  return ElevatorAlarm;
};
