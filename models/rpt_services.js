module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "RptServices", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      floor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mode_of_operation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      class_of_operation: {   
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_next: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "rpt_services", 
      timestamps: false,
    }
  );
};
