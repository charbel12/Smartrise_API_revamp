module.exports = (sequelize, DataTypes) => {
  const RefClassCategory = sequelize.define('RefClassCategory', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    ref_cat_id: { type: DataTypes.INTEGER, allowNull: false },
    ref_class_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
  }, {
    tableName: 'ref_class_category',
    timestamps: false,
  });
  return RefClassCategory;
};
