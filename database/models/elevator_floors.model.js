module.exports = (sequelize, DataTypes) => {
  const ElevatorFloor = sequelize.define('ElevatorFloor', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    elevator_id: { type: DataTypes.INTEGER, allowNull: false },
    floor_name: { type: DataTypes.STRING(255), allowNull: false },
    door_side: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    date_created: { type: DataTypes.DATE, allowNull: false },
    date_modified: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    ordinal: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'elevator_floors',
    timestamps: false,
  });
  return ElevatorFloor;
};
