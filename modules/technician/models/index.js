const { Op } = require('sequelize');
const { Parameters } = require('../../../database/models');

const fetchParameterByIndex = async(index, bits) =>{


    const parameter = await Parameters.findOne({
      where: {
        index: index,
        type: bits
      },
      attributes: ['id', 'name', 'index', 'type', 'sw_name', 'value0',
         'value1', 'value2', 'value3', 'value4', 'value5',
         'value6', 'value7', 'value8']
    });

    return parameter;
}

const fetchParameterByIndexByCar = async(carNum, index, bits) =>{

    const targetValueColumn = `value${carNum}`;
    const targetChangedColumn = `is_changed_car${carNum}`;

    const parameter = await Parameters.findOne({
      where: {
        index: index,
        type: bits
      },
      attributes: ['id', 'name', 'index', 'type', 'sw_name', targetValueColumn, targetChangedColumn]
    });

}

const fetchMultipleParametersByCar = async(carNum, paramsList) => {

    const targetValueColumn = `value${carNum}`;
    const targetChangedColumn = `is_changed_car${carNum}`;

    const conditions = paramsList.map(p => ({
        index: p.index,
        type: p.bits !== undefined ? p.bits : p.type
    }));

    const parameters = await Parameters.findAll({
      where: {
        [Op.or]: conditions
      },
      attributes: ['id', 'name', 'index', 'type', 'sw_name', targetValueColumn, targetChangedColumn]
    });

    return parameters;
}

module.exports = {
  fetchParameterByIndexByCar,
  fetchParameterByIndex,
  fetchMultipleParametersByCar
}