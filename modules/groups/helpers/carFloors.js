const TOOLS = require('../../../helpers/tools.js');
const { Parameters, sequelize } = require('../../../database/models');
const { Op } = require('sequelize');

const PARAM_TYPE_CAR = 24;
const PARAM_TYPE_DOOR = 32;
const PARAM_TYPE_NUM_FLOORS = 8;
const PARAM_INDEX_NUM_FLOORS = 92;
const PARAM_NAME_NUM_FLOORS = 'Number of FLRs';

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

async function syncFloorsData() {
    const carsStr = await TOOLS.getRedisKeyValue('car_labels');
    let carObject = [];
    try { 
        if (carsStr) carObject = JSON.parse(carsStr); 
    } catch (e) {}
    const numberOfCars = carObject.length || 8;

    const allParameters = await Parameters.findAll({
        where: {
            [Op.or]: [
                { type: PARAM_TYPE_CAR },
                { type: PARAM_TYPE_DOOR },
                { type: PARAM_TYPE_NUM_FLOORS, index: PARAM_INDEX_NUM_FLOORS },
                { type: 8, index: 174 } // Group Landing Offset
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
    const offsetParams = allParameters.filter(p => p.type === 8 && p.index === 174);

    const carData = [];

    // Clear the existing floors data
    try {
        await sequelize.query('DELETE FROM elevator_floors;');
    } catch (error) {
        console.error('Error truncating elevator_floors:', error);
    }

    for (let carId = 1; carId <= numberOfCars; carId++) {
        const floorArray = [];
        const numFloorsParam = numFloorsParams.find(p => p.name === PARAM_NAME_NUM_FLOORS);
        const numberOfFloors = numFloorsParam ? parseInt(numFloorsParam['value' + carId]) : 0;

        const offsetParam = offsetParams.find(p => p.name === 'Group Landing Offset');
        const groupLandingOffset = offsetParam ? parseInt(offsetParam['value' + carId]) : 0;

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
                    const floorOrdinal = i + groupLandingOffset;
                    floorArray.push({
                        GroupFloorID: i,
                        DoorSide: doorSide,
                        Pi: piLabel,
                        ordinal: floorOrdinal
                    });

                    try {
                        await sequelize.query(`
                            INSERT INTO elevator_floors (elevator_id, floor_name, door_side, ordinal, date_created, date_modified, status)
                            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true)
                        `, {
                            replacements: [carId, piLabel, doorSide, floorOrdinal]
                        });
                    } catch (error) {
                        console.error('Error inserting floor data into elevator_floors:', error);
                    }
                }
            }
        }

        carData.push({
            Id: carId,
            Label: carObject[carId - 1] || `Car ${carId}`,
            TotalHeight: 0,
            NumberOfFloors: numberOfFloors,
            FloorArray: floorArray,
            NumDoors: "0",
            GroupLandingOffset: groupLandingOffset,
            id: carId,
            name: `Car ${carId}`
        });
    }

    await TOOLS.setRedisKeyValue('cars_parameters_data', JSON.stringify(carData));
    
    return carData;
}

// Keep older function for backward compatibility
async function getCarsWithFloors(groupID) {
    return syncFloorsData();
}

module.exports = {
    getCarsWithFloors,
    syncFloorsData,
};
