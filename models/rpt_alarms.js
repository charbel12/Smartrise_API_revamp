module.exports = (sequelize, DataTypes) => {
  return sequelize.define('RptAlarms', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    elevator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    elevator_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alarm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    alarm_speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    alarm_position: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    car_speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    car_position: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    floor_pi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    floor_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     solution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'rpt_alarms',
    timestamps: false,
  });
};
