const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
// ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

const fs = require("fs");

var group = require('../../../helpers/group.js')

const { Faults } = require('../../../database/models');
/**
 * @route GET /faults
 * @Faults - Faults definition
 * @group Faults - Elevator Faults / System Faults
 * @produces application/json
 * @consumes application/json
 * @returns {RolesResponse.model} 200  - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.post(`${VARS.base_route}/datatables`, (req, res) => {
    MODEL.all(req.body, function(err, result) {
        res.json(result);
    });
});


/**
 * Get all faults recorded by Elevator cars
 * @route POST /faults/{groupID}/cars/{carID}/datatables
 * @group Faults - For elevator faults
 * @param {DatatablePayload.model} DatatablePayload.body - the new point
 * @param {integer} groupID.query - Elevator Group ID
 * @param {integer} carID.query - Elevator Car ID based on the Group ID
 * @produces application/json
 * @consumes application/json
 * @returns 200 - An object of user info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */

var allGroupPiLabel = ""
group.getAllGroupPiLabels(function(array1) {
    allGroupPiLabel = array1
})

var allGroupCarLabel = ""
group.getAllGroupCarLabels(function(array1) {
    allGroupCarLabel = array1
})

const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
APP.post(`${VARS.base_route}/:groupID/cars/:carID/datatables`, async(req, res) => {
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })


    req.body.zone = req.headers.zone ? req.headers.zone : "+03:00";

    MODEL.datatables(req.params.groupID, req.params.carID, req.body, function(err, result) {
        if (result.data) {
            result.data = result.data.map(x => {
                return {...x, timezone: TOOLS.getServerTimezone() };
            });
        } else {
            var data = []
            result.data = data
        }

        // group.getAllGroupPiLabels(function(array1){
        // 	allGroupPiLabel = array1
        // })
        // setTimeout(() => {
        // 	for (let index = 0; index < result.data.length; index++) {
        // 		var xresult = result.data[index];
        // 		car_label = allGroupCarLabel[req.params.groupID - 1][xresult.carid - 1]
        // 		car_label == undefined ? car_label = xresult.carid : car_label = car_label
        // 		try{
        // 			floor_label = allGroupPiLabel[req.params.groupID -1][xresult.floor].Pi
        // 		} catch(err) {
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
 * Clears all faults
 * @route DELETE /faults
 * @group Faults - For elevator faults
 * @produces application/json
 * @consumes application/json
 * @returns {DefaultResponse.model} 200 - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.delete(`${VARS.base_route}`, (req, res) => {
    MODEL.clearAll(req.body.group, function(err, result) {
        res.json({
            "successful": (err ? false : true),
            "err": err,
            "data": result
        });
    });
});

/**
 * Delete all faults by elecator cars
 * @route DELETE /faults/{groupID}/cars/{carID}/
 * @group Faults - For elevator faults
 * @param {integer} groupID.query - Elevator Group ID
 * @param {integer} carID.query - Elevator Car ID based on the Group ID
 * @produces application/json
 * @consumes application/json
 * @returns {DefaultResponse.model} 200 - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.delete(`${VARS.base_route}/:groupID/cars/:carID`, (req, res) => {
    MODEL.delete(req.params.groupID, req.params.carID, function(err, result) {
        res.json({
            "successful": (err ? false : true),
            "err": err,
            "data": result
        });
    });
});

/**
 * @route GET /faults/{id}
 * @group Faults - System Faults
 * @param {integer} id.path.required - faults id
 * @produces application/json
 * @consumes application/json
 * @returns {RolesResponse.model} 200  - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.get(`${VARS.base_route}/:id([0-9]+)`, (req, res) => {
    MODEL.get(req.params.id, function(err, result) {
        res.json({
            "successful": (err ? false : true),
            "err": err,
            "data": result[0]
        });
    });
});

/**
 * @route GET /faults/{id}/car
 * @group Faults - For elevator Faults
 * @param {integer} id.path.required - elevator faults id
 * @produces application/json
 * @consumes application/json
 * @returns {RolesResponse.model} 200  - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.get(`${VARS.base_route}/:id/car`, (req, res) => {
    req.body.zone = req.headers.zone ? req.headers.zone : "+00:00";
    MODEL.getCarFault(req.params.id, req.body, function(err, result) {

        result = result.map(x => {
            return {...x, timezone: TOOLS.getServerTimezone() };
        });

        res.json({
            "successful": (err ? false : true),
            "err": err,
            "data": result
        });
    });
});

/**
 * @route GET /faults/oldest
 * @group Faults - For elevator Faults
 * @produces application/json
 * @consumes application/json
 * @returns {RolesResponse.model} 200  - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */
APP.get(`${VARS.base_route}/oldest-record`, (req, res) => {
    MODEL.getOldestFaults(function(err, result) {
        res.json({
            "successful": (err ? false : true),
            "message": err ? err : "",
            "data": result
        });
    });
});

/**
 * @route GET /faults/{id}/number
 * @group Faults - System Faults
 * @param {integer} id.path.required - faults id
 * @produces application/json
 * @consumes application/json
 * @returns {RolesResponse.model} 200  - An object of info
 * @returns {AuthResponseFailed.model} 401 - Access is denied.
 * @security JWT
 */




APP.get(`${VARS.base_route}/:id/number`, (req, res) => {
    MODEL.getNumber(req.params.id, function(err, result) {
        res.json({
            "successful": (err ? false : true),
            "err": err,
            "data": result
        });
    });
});


APP.get('/faults', async (req, res) => {
  try {


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const elevator_id = req.query.elevator_id;

    const offset = (page - 1) * limit;

    const whereClause = {};
    if (elevator_id) {
      whereClause.elevator_id = elevator_id;
    }

    const faults = await Faults.findAndCountAll({
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