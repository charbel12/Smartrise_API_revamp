module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    secure_all: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    day_type: { type: DataTypes.STRING(255), allowNull: true },
    day_value: { type: DataTypes.TEXT, allowNull: true },
    ending_day: { type: DataTypes.STRING(255), allowNull: true },
    controls: { type: DataTypes.STRING(255), allowNull: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: true },
    start_time: { type: DataTypes.TIME, allowNull: true },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    end_time: { type: DataTypes.TIME, allowNull: true },
    date_created: { type: DataTypes.DATE, allowNull: true },
    date_modified: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'schedules',
    timestamps: false, // has date_created/date_modified but we won't auto-manage
  });
  return Schedule;
};
