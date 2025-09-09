module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "RptWait",
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
      floor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      direction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      wait_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "rpt_wait",
      timestamps: false,
    
    }
  );
};
