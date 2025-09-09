module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "RefClass", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
    },
    {
      tableName: "ref_class", 
      timestamps: false,
    }
  );
};
