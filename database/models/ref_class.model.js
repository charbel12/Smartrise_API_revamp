module.exports = (sequelize, DataTypes) => {
  const RefClass = sequelize.define('RefClass', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    class_id: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
  }, {
    tableName: 'ref_class',
    timestamps: false,
  });
  return RefClass;
};
