module.exports = (sequelize, DataTypes) => {
  const ElevatorFault = sequelize.define(
    'ElevatorFault',
    {
      fault_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      which_car: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fault_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fault_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      faults_solution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      fault_destination: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fault_floor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      fault_floor_label: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      fault_node: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fault_position: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fault_car_speed_fpm: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },

      fault_command_speed_fpm: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },

      fault_state: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'faults_fault',
      timestamps: false,
    }
  );

  return ElevatorFault;
};
