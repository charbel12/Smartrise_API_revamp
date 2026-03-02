const TOOLS = require('../../../helpers/tools.js');
const { Parameters } = require('../../../database/models');
const { Op } = require('sequelize');

const PARAM_TYPE_CAR = 24;
const PARAM_TYPE_DOOR = 32;
const PARAM_TYPE_NUM_FLOORS = 8;
const PARAM_INDEX_NUM_FLOORS = 92;
const PARAM_NAME_NUM_FLOORS = 'Number of FLRs';

// helper to convert a hex string to ascii
function hexToAscii(hex) {
    let ascii = '';
    for (let i = 0; i < hex.length; i += 2) {
        const charCode = parseInt(hex.substr(i, 2), 16);
        if (charCode > 0) {
            ascii += String.fromCharCode(charCode);
        }
    }
    return ascii;
}

/**
 * Load car labels from redis and merge with parameter data to build
 * the "cars with floors" structure used by the groups model/controller.
 *
 * @param {number} groupID currently unused, but kept for API compatibility
 * @returns {Promise<Array<Object>>} array of car objects with floor data
 */
async function getCarsWithFloors(groupID) {
    // right now groupID is ignored; it may be needed in later enhancements
    const cars = await TOOLS.getRedisKeyValue('car_labels');
    const carObject = JSON.parse(cars);
    const numberOfCars = carObject.length;

    const allParameters = await Parameters.findAll({
        where: {
            [Op.or]: [
                { type: PARAM_TYPE_CAR },
                { type: PARAM_TYPE_DOOR },
                { type: PARAM_TYPE_NUM_FLOORS, index: PARAM_INDEX_NUM_FLOORS }
            ]
        },
        attributes: [
            'type', 'index', 'name',
            'value1','value2','value3','value4',
            'value5','value6','value7','value8'
        ]
    });

    const carParameters = allParameters.filter(p => p.type === PARAM_TYPE_CAR);
    const doorParameters = allParameters.filter(p => p.type === PARAM_TYPE_DOOR);
    const numFloorsParams = allParameters.filter(p => p.type === PARAM_TYPE_NUM_FLOORS && p.index === PARAM_INDEX_NUM_FLOORS);

    const carData = [];

    for (let carId = 1; carId <= numberOfCars; carId++) {
        const floorArray = [];
        const numFloorsParam = numFloorsParams.find(p => p.name === PARAM_NAME_NUM_FLOORS);
        const numberOfFloors = numFloorsParam ? numFloorsParam['value' + carId] : 0;

        const frontOpeningMap = [
            doorParameters.find(p => p.index === 0)?.['value' + carId] || 0,
            doorParameters.find(p => p.index === 1)?.['value' + carId] || 0,
            doorParameters.find(p => p.index === 2)?.['value' + carId] || 0,
        ];

        const rearOpeningMap = [
            doorParameters.find(p => p.index === 4)?.['value' + carId] || 0,
            doorParameters.find(p => p.index === 5)?.['value' + carId] || 0,
            doorParameters.find(p => p.index === 6)?.['value' + carId] || 0,
        ];

        for (let i = 0; i < numberOfFloors; i++) {
            const floorParam = carParameters.find(p => p.index === i);
            if (floorParam) {
                const hexValue = parseInt(floorParam['value' + carId]).toString(16);
                const piLabel = hexToAscii(hexValue);

                const mapIndex = Math.floor(i / 32);
                const bitIndex = i % 32;

                const frontBit = (frontOpeningMap[mapIndex] >> bitIndex) & 1;
                const rearBit = (rearOpeningMap[mapIndex] >> bitIndex) & 1;

                let doorSide = 0;
                if (frontBit && rearBit) {
                    doorSide = 2; // Front and Rear
                } else if (frontBit) {
                    doorSide = 1; // Front only
                } else if (rearBit) {
                    doorSide = 3; // Rear only
                }

                if (doorSide > 0) {
                    floorArray.push({
                        GroupFloorID: i,
                        DoorSide: doorSide,
                        Pi: piLabel,
                    });
                }
            }
        }

        carData.push({
            Id: carId,
            Label: carObject[carId - 1],
            TotalHeight: 0,
            NumberOfFloors: numberOfFloors,
            FloorArray: floorArray,
            NumDoors: "0",
            GroupLandingOffset: "0",
            id: carId,
            name: `Car ${carId}`,
        });
    }

    return carData;
}

module.exports = {
    getCarsWithFloors,
};
