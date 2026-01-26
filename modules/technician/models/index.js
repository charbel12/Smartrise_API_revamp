const { Parameters } = require('../../../database/models')

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

    return parameter;
}

module.exports = {
  fetchParameterByIndexByCar,
  fetchParameterByIndex
}