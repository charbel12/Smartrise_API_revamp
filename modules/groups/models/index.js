const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE_NAME = VARS.table_name;
const TOOLS = require('../../../helpers/tools.js');
const fs = require('fs');
const { Parameters, sequelize } = require('../../../database/models');
const { Op } = require('sequelize');

const GroupFiles = require('../../settings/models/group-config.js');
const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];


module.exports = {
	datatables: function(groupID,carID,data, callback = null){
		var async = require('async'),
		    QueryBuilder = require('datatable');
		 
		var tableDefinition = {
			sSelectSql: `*`,
		    sFromSql: `(SELECT * FROM elevator_faults ef left join elevators e on ef.elevator_id = e.id left join system_faults sf on ef.fault_id=sf.id where ef.elevator_id = ${carID}) as sqlQuery`
		};
		 
		var queryBuilder = new QueryBuilder(tableDefinition);
		 
		// requestQuery is normally provided by the DataTables AJAX call
		var requestQuery = {
            start: 0,
            length: 10,
            search: {
                value:"",
                regex: false
            }
        };

        var opts = TOOLS.extendDefaults(requestQuery, data);
		opts = TOOLS.datatableColumnName(opts);
		// Build an object of SQL statements
		var queries = queryBuilder.buildQuery(opts);
		 
		// Connect to the database
		var _params = {
            recordsTotal: function(cb) {
                mysql.pool(queries.recordsTotal,[], function(error, results) {
                	cb(error, results);
                });
            },
            select: function(cb) {
                mysql.pool(queries.select,[], function(error, results) {
                    cb(error, results);
                });
            },
        };

        if (opts.search.value != "") {
            _params["recordsFiltered"] = function(cb) {
                mysql.pool(queries.recordsTotal,[], function(error, results) {
                    cb(error, results);
                });
            }
        }

		async.parallel(
            _params,
            function(err, results) {
            	callback(err,queryBuilder.parseResponse(results));
            }
        );

	},
	getAll: function(callback = null){
		/*mysql.query(`select * from ${TABLE_NAME} where status=1`,[],function(err,result){
			callback(err,result);
		})*/
		var _result = [];
		
		PI.forEach(function(p,i){
			if(p){
				try{

				_result.push({
					'data: ': p
				});
					
				} catch(e) {

					_result.push({
						id: p['GroupID'],
						name: p['JobName']
					});
				}
			}
		});
		callback(null,_result);
	},
	getAllCars: function(groupID, callback = null){
		var _result = [];
		
		GroupFiles.getGroupConfigFiles(function(err,files){
			files.forEach(function(val){
				var _f = val.content;
				if(_f.GroupID == groupID){
					_f.Cars.forEach(function(v){
						v['id'] = v['Id'];
						v['name'] = 'Car ' + v['id'];
						_result.push(v);
					})
				}
			})
			callback(null,_result);
		});
	},
	getCarLabels: async function(groupID, callback = null){
		const cars = await TOOLS.getRedisKeyValue('car_labels');
		const carObject = JSON.parse(cars);
		const carArray = []
		carObject.forEach(car => {
			console.log(car.includes("Car"));
			if(!car.includes("Car")){
				car = "Car " + car;
				carArray.push(car);
			}
		});
		callback(null,carArray);
	},
	getAllPiLabels: function(groupID, callback = null) {
		var pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
		pi_json.forEach(pi => {
			if (pi.GroupID == groupID) {
				var pi_ip = pi.location.split(':')[0];
				axios.get(`http://`+ pi_ip + `/ajax/get_pi_labels/`, {timeout: 2000}).then((response) => {
					var jsonObj = response.data;
					_result = jsonObj;
					callback(null,_result);
				}).catch((err) => {
					if (err.response) {
						if (err.response.status == 500) {
							_result = {"Status":500, "Message":"DAD unit in not configured"};
							callback(null,_result);
						}
					} else {
						_result = {"Status":405, "Message":"RPI is not connected"};
						callback(null,_result);
					}
				})
			}
		})
		
	},
	delete: function(groupID,carID,callback = null){
		mysql.pool(`delete from ${TABLE_NAME} where elevator_id=?`,[carID],function(err,result){
			callback(err,result);
		})
	},
	import: function(data,callback = null){
		mysql.pool("",[],function(err,result){
			callback(err,result);
		})
	},
	export: function(data,callback = null){
		mysql.pool("",[],function(err,result){
			callback(err,result);
		})
	},

	getCarsWithFloors: async function(groupID) {
		try {

			const cars = await TOOLS.getRedisKeyValue('car_labels');
			const carObject = JSON.parse(cars);
			const numberOfCars = carObject.length;
			const allParameters = await Parameters.findAll({
				where: {
					[Op.or]: [
						{ type: 24 },
						{ type: 32 },
						{ type: 8, index: 92 }
					]
				},
				attributes: ['type', 'index', 'name', 'value1', 'value2', 'value3', 'value4', 'value5', 'value6', 'value7', 'value8'] 
			});

			const carParameters = allParameters.filter(p => p.type == 24);
			const doorParameters = allParameters.filter(p => p.type == 32);
			const numFloorsParams = allParameters.filter(p => p.type == 8 && p.index == 92);

			const hexToAscii = (hex) => {
				let ascii = '';
				for (let i = 0; i < hex.length; i += 2) {
					const charCode = parseInt(hex.substr(i, 2), 16);
					if (charCode > 0) {
						ascii += String.fromCharCode(charCode);
					}
				}
				return ascii;
			};
			const carData = [];
			for (let carId = 1; carId <= numberOfCars; carId++) {
				const floorArray = [];
				const numFloorsParam = numFloorsParams.find(p => p.name === 'Number of FLRs');
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
		} catch (error) {
			throw error;
		}
	}


}