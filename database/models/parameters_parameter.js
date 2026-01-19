module.exports = (sequelize, DataTypes) => {
  const Parameters = sequelize.define('Parameters', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
    },
    index: {
      type: DataTypes.INTEGER,
    },
    page: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    block_index: {
      type: DataTypes.INTEGER,
    },
    // Value Columns
    value1: { type: DataTypes.FLOAT, defaultValue: 0},
    value2: { type: DataTypes.FLOAT, defaultValue: 0},
    value3: { type: DataTypes.FLOAT, defaultValue: 0},
    value4: { type: DataTypes.FLOAT, defaultValue: 0},
    value5: { type: DataTypes.FLOAT, defaultValue: 0},
    value6: { type: DataTypes.FLOAT, defaultValue: 0},
    value7: { type: DataTypes.FLOAT, defaultValue: 0},
    value8: { type: DataTypes.FLOAT, defaultValue: 0},
    
    sw_name: {
      type: DataTypes.STRING,
    },

    // Boolean Change Trackers
    is_changed_car1: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car2: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car3: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car4: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car5: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car6: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car7: { type: DataTypes.FLOAT, defaultValue: 0 },
    is_changed_car8: { type: DataTypes.FLOAT, defaultValue: 0 },
  }, {
    tableName: 'parameters_parameter',
    timestamps: false,
    underscored: true,
  });

  return Parameters;
};