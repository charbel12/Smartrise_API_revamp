const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const AUTH = require('../../../helpers/authentication.js');
const SOCKET = require('../../socket/models/index.js');

const { exec } = require("child_process");

const fs = require('fs');
const axios = require('axios');

var up_ratio = {1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1}
var down_ratio = {1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1}

const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];

if (fs.existsSync(process.env.EnvDirname + '.up_ratio.json')) {
	up_ratio = fs.readFileSync(process.env.EnvDirname + '.up_ratio.json');
	up_ratio = JSON.parse(up_ratio)
} else {
	exec("cp " + process.env.Dirname + '/.up_ratio.json' + " " + process.env.EnvDirname + '.up_ratio.json', (error, stdout, stderr) => {
	});
}
if (fs.existsSync(process.env.EnvDirname + '.down_ratio.json')) {
	down_ratio = fs.readFileSync(process.env.EnvDirname + '.down_ratio.json');
	down_ratio = JSON.parse(down_ratio)
} else {
	exec("cp " + process.env.Dirname + '/.down_ratio.json' + " " + process.env.EnvDirname + '.down_ratio.json', (error, stdout, stderr) => {
	});
}

ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes

APP.get(`${VARS.base_route}/:groupID/set-ratio-down/:ratio`,(req,res)=>{
	var ratio = req.params.ratio
	down_ratio[req.params.groupID] = parseFloat(ratio)
	fs.writeFile(process.env.EnvDirname + '.down_ratio.json', JSON.stringify(down_ratio), function (err) {
		if (err) throw err;
	});
	res.json("Down ratio updated : " + parseFloat(ratio));
});

APP.get(`${VARS.base_route}/:groupID/set-ratio-up/:ratio`,(req,res)=>{
	var ratio = req.params.ratio
	up_ratio[req.params.groupID] = parseFloat(ratio)
	fs.writeFile(process.env.EnvDirname + '.up_ratio.json', JSON.stringify(up_ratio), function (err) {
		if (err) throw err;
	});
	res.json("Up ratio updated : " + parseFloat(ratio));
});

//
ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for secured/authenticated routes


/**
* Get all car groups
* @route GET /groups
* @group Groups - Car Groups
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}`,(req,res)=>{
	MODEL.getAll(function(err,result){
		res.json({
			successful: (err ? false : true),
			message: (err ? err : ""),
			data: result
		});
	});
});

/**
* Get all cars by group
* retrieve all cars by group id
* @route GET /groups/{groupID}/cars
* @group Groups - Car Groups
* @param {integer} groupID.path - Elevator Group ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:groupID/car-labels`,(req,res)=>{
	MODEL.getCarLabels(req.params.groupID,function(err,result){
		res.json({
			successful: (err ? false : true),
			message: (err ? err : ""),
			data: result
		});
	});
});

APP.get(`${VARS.base_route}/:groupID/cars`,(req,res)=>{
	MODEL.getAllCars(req.params.groupID,function(err,result){
		res.json({
			successful: (err ? false : true),
			message: (err ? err : ""),
			data: result
		});
	});
});

APP.get(`${VARS.base_route}/:groupID/cars-with-offset`,(req,res)=>{
	
	var jsonObj = TOOLS.getRedisKeyValue("requests:" + req.params.groupID + ":cars_with_offset");
	if (jsonObj && ! TOOLS.requestsRequired("cars_with_offset", req.params.groupID)) {
		res.json(jsonObj);
	} else {
		pi_json.forEach(pi => {
			if (pi.GroupID == req.params.groupID) {
				var pi_ip = pi.location.split(':')[0];
				axios.get(`http://`+ pi_ip + `/ajax/get_pi_labels/`, {timeout: 1000}).then((response) => {
					var jsonObj = response.data;
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":cars_with_offset", JSON.stringify(jsonObj))
					TOOLS.updateLastUpdateLocal("cars_with_offset", req.params.groupID)
					res.json(jsonObj);
				}).catch((err) => {

					var default_response = []
					for (var i=0; i<95; i++){
						var obj = {"carIndex": i.toString(),"cars": []}
						if (i != 0) {
							var obj2 ={"value": i.toString()}
						} else {
							var obj2 ={"value": "GF"}
						}
						for (var j=0; j<8;j++){
							obj["cars"].push(obj2)
						}
						default_response.push(obj)
					}
					default_response = JSON.stringify(default_response)
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":cars_with_offset", JSON.stringify(default_response))
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":last_updated_local:cars_with_offset", 0)
					res.json(default_response);
				})
			}
		})
	}	
});

APP.get(`${VARS.base_route}/parameters`,(req,res)=>{

	var jsonObj = TOOLS.getRedisKeyValue("requests:parameters_descriptions");
	if (jsonObj && ! TOOLS.requestsRequired("parameters", req.params.groupID)) {
		res.json(JSON.parse(jsonObj));
	} else {
		var pi = pi_json[0]
		var pi_ip = pi.location.split(':')[0];
		axios.get(`http://`+ pi_ip + `/api/parameters`, {timeout: 1000}).then((response) => {
			var jsonObj = response.data;
			TOOLS.setRedisKeyValue("requests:parameters_descriptions", jsonObj)
			TOOLS.updateLastUpdateLocal("parameters", req.params.groupID)
			res.json(jsonObj);
		}).catch((err) => {

			res.json({"Status":405, "Message":"DAD unit is not connected"});
		})
	}	
});

APP.get(`${VARS.base_route}/:groupID/get-parameters/:keys`,(req,res)=>{
	const force = req.query.force
	var jsonObj = TOOLS.getRedisKeyValue("requests:" + req.params.groupID + ":arrayparameters");
	if (!force && jsonObj && ! TOOLS.requestsRequired("arrayparameters", req.params.groupID)) {
		res.json(JSON.parse(jsonObj));
	} else {
		pi_json.forEach(pi => {
			if (pi.GroupID == req.params.groupID) {
				var pi_ip = pi.location.split(':')[0];
				axios.get(`http://`+ pi_ip + `/api/arrayparameter?list=`+req.params.keys, {timeout: 3000}).then((response) => {
					var jsonObj = {};
					for (let index = 0; index < Object.keys(response.data).length; index++) {
						const key = Object.keys(response.data)[index];
						const value = response.data[key]
						jsonObj[key] = value
					}
					jsonObj2 = JSON.stringify(JSON.stringify(jsonObj))
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":arrayparameters", jsonObj2)
					TOOLS.updateLastUpdateLocal("arrayparameters", req.params.groupID)
					res.json(jsonObj);
				}).catch((err) => {

					var default_response = '{"8:92":{"id":557,"type":"8","index":"92","page":"","name":"Number of FLRs","value1":"32","value2":"32","value3":"32","value4":"32","value5":"32","value6":"32","value7":"32","value8":"32","sw_name":"NumFloors"},"8:174":{"id":639,"type":"8","index":"174","page":"","name":"Group Landing Offset","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"GroupLandingOffset"},"32:0":{"id":2124,"type":"32","index":"0","page":"","name":"Front Opening Map 0","value1":"4294967295","value2":"4294967295","value3":"4294967295","value4":"4294967295","value5":"4294967295","value6":"4294967295","value7":"4294967295","value8":"4294967295","sw_name":"OpeningBitmapF_0"},"32:1":{"id":2125,"type":"32","index":"1","page":"","name":"Front Opening Map 1","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapF_1"},"32:2":{"id":2126,"type":"32","index":"2","page":"","name":"Front Opening Map 2","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapF_2"},"32:4":{"id":2128,"type":"32","index":"4","page":"","name":"Rear Opening Map 0","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_0"},"32:5":{"id":2129,"type":"32","index":"5","page":"","name":"Rear Opening Map 1","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_1"},"32:6":{"id":2130,"type":"32","index":"6","page":"","name":"Rear Opening Map 2","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_2"}}'
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":arrayparameters", JSON.stringify(default_response))
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":last_updated_local:arrayparameters", 0)
					res.json(JSON.parse(default_response));
				})
			}
		})
	}
});

APP.get(`${VARS.base_route}/:groupID/get-settings`,(req,res)=>{

	var jsonObj = TOOLS.getRedisKeyValue("requests:" + req.params.groupID + ":settings");
	if (jsonObj && ! TOOLS.requestsRequired("settings", req.params.groupID)) {
		res.json({
			[req.params.groupID] : JSON.parse(jsonObj)
		});
	} else {
		pi_json.forEach(pi => {
			if (pi.GroupID == req.params.groupID) {
				var pi_ip = pi.location.split(':')[0];
				axios.get(`http://`+ pi_ip + `/api/system/settings`, {timeout: 2000}).then((response) => {
					var jsonObj = {} 
					jsonObj[req.params.groupID] = response.data; 
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":settings", JSON.stringify(JSON.stringify(response.data)))
					TOOLS.updateLastUpdateLocal("settings", req.params.groupID)
					res.json(jsonObj);
				}).catch((err) => {

					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":settings", JSON.stringify(JSON.stringify({
						"number_of_cars": "1",
						"job_name": req.params.groupID,
						"car_label_1": "1",
						"timezone": "UTC",
						"datetime": ""
					})))
					TOOLS.setRedisKeyValue("requests:" + req.params.groupID + ":last_updated_local:settings", 0)
					res.json(
						{
							[req.params.groupID] : {
								"number_of_cars": "1",
								"job_name": req.params.groupID,
								"car_label_1": "1",
								"timezone": "UTC",
								"datetime": ""
							}
						}
					)
				})
			}
		})
	}
});

APP.get(`${VARS.base_route}/:groupID/get-parameter/:paramType/:paramIndex`,(req,res)=>{
	pi_json.forEach(pi => {
		if (pi.GroupID == req.params.groupID) {
			var pi_ip = pi.location.split(':')[0];
			axios.get(`http://`+ pi_ip + `/api/parameter?type=`+req.params.paramType+`&index=` + req.params.paramIndex, {timeout: 2000}).then((response) => {
				var jsonObj = response.data;
				TOOLS.setRedisKeyValue("requests:lastparameter", jsonObj)
				res.json(jsonObj);
			}).catch((err) => {

				var jsonObj = TOOLS.getRedisKeyValue("requests:lastparameter");
				if (jsonObj) {
					res.json(jsonObj);
				} else {
					res.json({"Status":405, "Message":"DAD unit is not connected"});
				}
			})
		}
	})
});

APP.get(`${VARS.base_route}/:groupID/get-car-modes`,(req,res)=>{
	res.json(SOCKET.car_modes);
});

APP.get(`${VARS.base_route}/:groupID/get-ratio-up`,(req,res)=>{
	res.json(up_ratio[req.params.groupID]);
});

APP.get(`${VARS.base_route}/:groupID/get-ratio-down`,(req,res)=>{
	res.json(down_ratio[req.params.groupID]);
});

module.exports = APP;