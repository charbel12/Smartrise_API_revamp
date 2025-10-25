module.exports = (sequelize, DataTypes) => {
  const RptProgramEvent = sequelize.define('RptProgramEvent', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
    date_created: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'rpt_program_events',
    timestamps: false,
  });
  return RptProgramEvent;
};
