module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "RefCategory", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ref_cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ref_class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "ref_class_category",
      timestamps: false,
    }
  );
};
