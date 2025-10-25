
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SystemFaults', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
    },
    construction: {
      type: DataTypes.STRING,
    },
    clear_type: {
      type: DataTypes.STRING,
    },
    clear_ccs: { 
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    definition: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'system_faults',
    timestamps: false,
  });
};
