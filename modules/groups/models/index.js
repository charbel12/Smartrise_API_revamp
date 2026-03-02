const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');
const { Parameters, sequelize } = require('../../../database/models');
const GroupFiles = require('../../settings/models/group-config.js');
// helper module extracted from getCarsWithFloors
const carFloorsHelper = require('../helpers/carFloors.js');
const fs = require('fs');

const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];

module.exports = {

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

	getAll: function(callback = null){
		let _result = [];
		
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

	getCarsWithFloors: async function(groupID) {
		// delegate the heavy lifting to a helper module so the model
		// file stays concise and easier to maintain.
		return carFloorsHelper.getCarsWithFloors(groupID);
	},

}