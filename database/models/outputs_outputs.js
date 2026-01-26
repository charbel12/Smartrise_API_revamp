module.exports = (sequelize, DataTypes) => {
  const Outputs = sequelize.define('Outputs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    output_tag: {
      type: DataTypes.STRING,
    },
    output_string: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'outputs_outputs',
    timestamps: false,
    underscored: true,
  });

  return Outputs;
};
