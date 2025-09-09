
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SystemAlarm', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    definition: {
      type: DataTypes.STRING,
    },
     solution: {
        type: DataTypes.TEXT,
    },
  }, {
    tableName: 'system_alarms',
    timestamps: false,
  });
};
