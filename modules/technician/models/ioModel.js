const { Parameters } = require('../../../database/models');
const { Op } = require('sequelize');
const inputs_values = require('../../../configs/inputs.json');
const outputs_values = require('../../../configs/outputs.json');


const formatPinWithErrors = (description, value, mapping, pinNumber, errorList) => {
    const valStr = String(value || '0');
    
    if (valStr === '0') {
        return { description, value: '0', label: '-- UNUSED --', pin_number: pinNumber };
    }

    const label = mapping[valStr];
    if (!label) {
        if (errorList) errorList.push(valStr);
        return { description, value: valStr, label: '-- UNUSED --', pin_number: pinNumber };
    }

    return { description, value: valStr, label, pin_number: pinNumber };
};

const getBoardIO = async (prefix, count, carNum, offsets, trackErrors = false) => {
    const col = `value${carNum}`;
    const inputNames = Array.from({ length: count }, (_, i) => `${prefix}_Inputs_${501 + i}`);
    const outputNames = Array.from({ length: count }, (_, i) => `${prefix}_Outputs_${601 + i}`);

    const params = await Parameters.findAll({
        where: { sw_name: { [Op.in]: [...inputNames, ...outputNames] } },
        attributes: ['sw_name', col],
        raw: true
    });

    const findVal = (name) => params.find(p => p.sw_name === name)?.[col] || '0';

    const errors = { inputs: [], outputs: [] };

    return {
        inputs: inputNames.map((name, i) => 
            formatPinWithErrors(String(501 + i), findVal(name), inputs_values, offsets.input + i, trackErrors ? errors.inputs : null)
        ),
        outputs: outputNames.map((name, i) => 
            formatPinWithErrors(String(601 + i), findVal(name), outputs_values, offsets.output + i, trackErrors ? errors.outputs : null)
        ),
        ...(trackErrors && { errors })
    };
};

module.exports = { getBoardIO };