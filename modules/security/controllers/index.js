const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const AUTH = require('../../../helpers/authentication.js');

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes


/**
* Get car security
* @route GET /security/{groupID}/cars
* @group Security - hall/car security
* @param {integer} groupID.query - Elevator Group ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:groupID/cars`,(req,res)=>{
	MODEL.getCarSecurity(req.params.groupID,function(err,result){
		res.json(result);
	});
});

/**
* Get hall security
* @route GET /security/{groupID}/halls
* @group Security - hall/car security
* @param {integer} groupID.query - Elevator Group ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:groupID/halls`,(req,res)=>{
	MODEL.getCarSecurity(req.params.groupID,function(err,result){
		res.json(result);
	});
});

/**
* @typedef CarSecurityPayload
* @property {integer} floorID - Floor id
* @property {string} door - Elevator Door - eg: front|rear
* @property {string} security - Security type - eg: access|secure 
*/

/**
* Update car security
* @route PUT /security/{groupID}/cars/{carID}
* @group Security - hall/car security
* @param {integer} groupID.query - Elevator Group ID
* @param {integer} carID.query - Elevator Car ID
* @param {CarSecurityPayload.model} Payload.body - Security Car payload
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.put(`${VARS.base_route}/:groupID/cars/:carID`,(req,res)=>{
	var data = {
		groupID: req.params.groupID,
		carID: req.params.carID,
		door: req.body.door,
		security: req.body.security,
		floorID: req.body.floorID
	}
	MODEL.updateCarSecurity(data,function(err,result){
		res.json(result);
	});
});

/**
* @route POST /security
* @group Security - hall/car security
* @param {NewSecurity.model} Payload.body - Security details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of security info
* @returns 401 - Access is denied.
* @security JWT
*/
//creating a new item
APP.post(`${VARS.base_route}`,(req,res)=>{
	var _params = req.body;
	var _defaults = {};
	var opts = TOOLS.extendDefaults(_defaults,_params);
	
	MODEL.create(opts,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

/**
* @route DELETE /security/
* @group Security - hall/car security
* @param {NewSecurity.model} Payload.body - Security details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.delete(`${VARS.base_route}`,(req,res)=>{
	var _params = req.body;
	var _defaults = {};
    var opts = TOOLS.extendDefaults(_defaults,_params);
	MODEL.delete(opts,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

/**
* Get car security
* @route GET /security/{groupID}/schedules
* @group Security - car security
* @param {integer} scheduleID.query - Schedule ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:scheduleID/schedules`,(req,res) => {
	MODEL.getByScheduleId(req.params.scheduleID,function(err,result){
		res.json(result);
	});
});

/**
* Get car security
* @route GET /security/v2/{scheduleID}/schedules/{controls}
* @group Security - car security
* @param {integer} scheduleID.query - Schedule ID
* @param {string} controls.query - Controls
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/v2/:scheduleID/:controls/schedules`,(req,res) => {
	MODEL.getByScheduleIdV2(req.params.scheduleID,  req.params.controls,function(err,result){
		res.json(result);
	});
});

/**
* @route DELETE /security by schedule id/
* @group Security - hall/car security
* @param {integer} scheduleID.query - Schedule ID
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.delete(`${VARS.base_route}/:scheduleID/delete/schedules`,(req,res)=>{
	MODEL.deleteByScheduleId(req.params.scheduleID,function(err,result){
		console.log(err)
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

module.exports = APP;