module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ProgramEvents", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,   
        allowNull: true,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "rpt_program_events", 
      timestamps: false,
    }
  );
};
