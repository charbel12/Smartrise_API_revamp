const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const SECURITY_MODEL = require('../../security/models/index.js');
const MOMENT = require('moment');

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

/**
* @route POST /schedules/datatables
* @group users - User Management
* @param {DatatablePayload.model} DatatablePayload.body - the new point
* @produces application/json
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/datatables`,(req,res)=>{
	MODEL.datatables(req.body,function(err,result){
		if(err) {

		}
		res.json(result);
	});
});

/**
* @route POST /schedules/v2/datatables
* @group users - User Management
* @param {DatatablePayload.model} DatatablePayload.body - the new point
* @produces application/json
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/v2/datatables`,(req,res)=>{
	MODEL.datatablesV2(req.body,function(err,result){
		if(err) {

		}
		res.json(result);
	});
});

/**
* @route GET /schedules/{id}
* @group Schedules - Schedules Management
* @param {integer} id.path.required - user id
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:id`,(req,res)=>{
	MODEL.get(req.params.id,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

/**
* @route GET /schedules/v2/{id}
* @group Schedules - Schedules Management
* @param {integer} id.path.required - user id
* @produces application/json
* @consumes application/json
* @returns 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/v2/:id`,(req,res)=>{

	if(typeof req.params.id === "string" && parseInt(req.params.id) === NaN){
		res.json({
			successful: false,
			message: "Invalid parameter!"
		});
		return;
	}

	MODEL.getV2(req.params.id,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data": result[0] || ""
		});
		return;
	});
});

/**
* @route POST /schedules
* @group schedules - Schedule Management
* @param {NewSchedule.model} Payload.body - schedule details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
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
* @route POST /schedules/v2/create
* @group schedules - Schedule Management
* @param {NewSchedule.model} Payload.body - schedule details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/v2/create`,(req,res)=>{
	var _params = req.body ? req.body : "";
	var _defaults = {};
    var opts = TOOLS.extendDefaults(_defaults, _params);
	
	MODEL.createV2(opts,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

/**
* @route PUT /schedules/{id}
* @group users - Schedule Management
* @param {integer} id.path.required - Schedule id
* @param {UserDetails.model} UserDetails.body - Schedule info details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of Schedule info
* @returns 401 - Access is denied.
* @security JWT
*/
//updating item details
APP.put(`${VARS.base_route}/:id`,(req,res)=>{
	var _params = req.body;
	var _defaults = {};
	var opts = TOOLS.extendDefaults(_defaults,_params);
	MODEL.update(req.params.id,opts,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});

/**
* @route PUT /schedules/{id}
* @group users - Schedule Management
* @param {integer} id.path.required - Schedule id
* @param {UserDetails.model} UserDetails.body - Schedule info details
* @produces application/json
* @consumes application/json
* @returns 200 - An object of Schedule info
* @returns 401 - Access is denied.
* @security JWT
*/
//updating item details
APP.put(`${VARS.base_route}/v2/:id`,(req,res)=>{

	if(typeof req.params.id === "string" && parseInt(req.params.id) === NaN){
		res.json({
			successful: false,
			message: "Invalid parameter!"
		});
		return;
	}

	var _params = req.body;
	var _defaults = {};
	var opts = TOOLS.extendDefaults(_defaults,_params);
	MODEL.updateV2(req.params.id,opts,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
		return;
	});
});

/**
* @route DELETE /schedules/{id}
* @group schedules - Schedule Management
* @param {integer} id.path.required - schedule id
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.delete(`${VARS.base_route}/:id`,(req,res)=>{
	
	MODEL.delete(req.params.id,function(err,result){
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		});
	});
});
/**
* @route POST /schedules/{id}/{groupID}/{isSecure}
* @group schedules - Schedule Management
* @param {integer} id.path.required - schedule id
* @param {integer} id.path.required - isSecure
* @param {integer} id.path.required - group id
* @produces application/json
* @consumes application/json
* @returns 200 - An object of schedule info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/:id/:groupId/:isSecure`, (req, res) => {
	const { id, groupId } = req.params
	const isSecure = (req.params.isSecure === 'true') ? 1 : 0
	const defaults = {
		data : {
			secure_all: isSecure,
			group_id: groupId
		}
	}
	const opts = TOOLS.extendDefaults(defaults, req.body)
	if(isSecure === 0 ) {
		SECURITY_MODEL.deleteByScheduleId(id, opts.data.group_id, function(err, result) {
			if(err){

			}
		})
	}
	MODEL.update(id, opts, function(err, result) {
		res.json({
			"successful":(err ? false : true),
			"message":err,
			"data":result
		})
	})
});

/**
* @route POST /schedules/v2/validate/title
* @group Scheduler - Scheduler Management
* @produces application/json
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/v2/validate`,(req,res)=>{
	
	let key;
	let value;
	try{
		if(typeof req.body.validate === "undefined"){
			res.json({
				successful: false,
				message: "Invalid parameter!"
			});
			return;
		}

		if(req.body.validate.key === "name"){
			key = req.body.validate.key;
			value = req.body.validate.value;
		}else if (req.body.validate.key === "date_time"){
			key = "start_time";
			value = req.body.validate.value;
		}else{
			res.json({
				successful: false,
				message: "Invalid parameter!"
			});
			return;
		}

		let param = {
			key, value
		}

		if(typeof req.body.validate.schedule_id === "undefined"){
			delete param.schedule_id
		}else{
			param.schedule_id = req.body.validate.schedule_id;
		}

		if(typeof req.body.validate.date === "undefined"){
		 	delete param.date;
		}else{
			param.date = req.body.validate.date;
		}

		MODEL.validate(param, function(err,result){
			if(err) {

			}
			return res.json(result);
		});
	}catch(err){
		return res.json({
			successful: false,
			message: err.message
		});
	}
});

module.exports = APP;