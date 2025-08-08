const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const AUTH = require('../../../helpers/authentication.js');

const { Alarms } = require('../../../models');

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

var fs = require("fs");
const SOCKET_MODEL = require('../../socket/models/index.js')
const {default: axios} = require("axios")

var group = require('../../../helpers/group.js')

/**
* @route GET /alarms
* @Alarms - Alarms definition
* @group Alarms - Elevator Alarms / System Alarms
* @produces application/json
* @consumes application/json
* @returns {RolesResponse.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/datatables`, (req,res)=>{
	MODEL.all(req.body,function(err,result){
		res.json(result);
	});
});


/**
* Get all alarms recorded by Elevator cars
* @route POST /alarms/{groupID}/cars/{carID}/datatables
* @group Alarms - For elevator alarms
* @param {DatatablePayload.model} DatatablePayload.body - the new point
* @param {integer} groupID.path - Elevator Group ID
* @param {integer} carID.path - Elevator Car ID based on the Group ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/

var allGroupPiLabel = ""
group.getAllGroupPiLabels(function(array1){
	allGroupPiLabel = array1
})

var allGroupCarLabel = ""
group.getAllGroupCarLabels(function(array1){
	allGroupCarLabel = array1
})

const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];

APP.post(`${VARS.base_route}/:groupID/cars/:carID/datatables`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })


	req.body.zone = req.headers.zone ? req.headers.zone : "+00:00";
	MODEL.datatables(req.params.groupID,req.params.carID,req.body,function(err,result){
		if(result.data){
			result.data = result.data.map(x =>{
				return {...x, timezone: TOOLS.getServerTimezone()};
			});
		}else{
			var data = []
			result.data = data
		}
		// setTimeout(() => {
		// 	for (let index = 0; index < result.data.length; index++) {
		// 		var xresult = result.data[index];
		// 		car_label = allGroupCarLabel[req.params.groupID - 1][xresult.carid - 1]
		// 		car_label == undefined ? car_label = xresult.carid : car_label = car_label
		// 		try{
		// 			floor_label = allGroupPiLabel[req.params.groupID -1][xresult.floor].Pi
		// 		} catch(err){
		// 			floor_label = "{" + xresult.floor + "}"
		// 		}
		// 		xresult.floor = floor_label
		// 		xresult.carid = car_label
		// 		result.data[index] = xresult
		// 	}

		// 	setTimeout(() => {
				res.json(result);
		// 	}, 500);
		// }, 1000); 
	});
});

/**
* Delete all alarms by elecator cars
* @route DELETE /alarms/{groupID}/cars/{carID}/
* @group Alarms - For elevator alarms
* @param {integer} groupID.path - Elevator Group ID
* @param {integer} carID.path - Elevator Car ID based on the Group ID
* @produces application/json
* @consumes application/json
* @returns {DefaultResponse.model} 200 - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.delete(`${VARS.base_route}/:groupID/cars/:carID`,(req,res)=>{
	MODEL.delete(req.params.groupID,req.params.carID,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"err":err,
			"data":result
		});
	});
});

/**
* Clears all alarms
* @route DELETE /alarms
* @group Alarms - For elevator alarms
* @produces application/json
* @consumes application/json
* @returns {DefaultResponse.model} 200 - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.delete(`${VARS.base_route}`,(req,res)=>{
	MODEL.clearAll(req.body.groupId, function(err,result){
		res.json({
			"successful":(err ? false : true),
			"err":err,
			"data":result
		});
	});
});
/**
* @route GET /alarms/{id}
* @group Alarms - System alarms
* @param {integer} id.path.required - alarms id
* @produces application/json
* @consumes application/json
* @returns {RolesResponse.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:id`, (req,res)=>{
	MODEL.get(req.params.id,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"err":err,
			"data":result[0]
		});
	});
});

/**
* @route GET /alarms/{id}/car
* @group Alarms - For elevator alarms
* @param {integer} id.path.required - elevator alarms id
* @produces application/json
* @consumes application/json
* @returns {RolesResponse.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:id/car`, (req,res)=>{
	req.body.zone = req.headers.zone ? req.headers.zone : "+00:00";
	MODEL.getCarAlarm(req.params.id, req.body,function(err,result){
		result = result.map(x =>{
			return {...x, timezone: TOOLS.getServerTimezone()};
		});
		res.json({
			"successful":(err ? false : true),
			"err":err,
			"data":result
		});
	});
});


APP.get('/alarms', async (req, res) => {
  try {
    console.log(req.query);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const elevator_id = req.query.elevator_id;

    const offset = (page - 1) * limit;

    const whereClause = {};
    if (elevator_id) {
      whereClause.elevator_id = elevator_id;
    }

    const faults = await Alarms.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });

    res.json({
      total: faults.count,
      page,
      limit,
      data: faults.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = APP;