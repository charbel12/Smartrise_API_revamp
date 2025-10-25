module.exports = (sequelize, DataTypes) => {
  const ElevatorGroup = sequelize.define('ElevatorGroup', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    elevator_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }, {
    tableName: 'elevator_groups',
    timestamps: false,
  });
  return ElevatorGroup;
};
