module.exports = (sequelize, DataTypes) => {
  const Inputs = sequelize.define('Inputs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    input_tag: {
      type: DataTypes.STRING,
    },
    input_string: {
      type: DataTypes.STRING,
    },
    activation_state: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: 'inputs_inputs',
    timestamps: false,
    underscored: true,
  });

  return Inputs;
};
