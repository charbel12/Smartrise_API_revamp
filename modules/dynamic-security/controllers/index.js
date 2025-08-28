const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const AUTH = require('../../../helpers/authentication.js');
const  MOMENT = require("moment");
const FormData = require("form-data");
//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

var fs = require("fs");
const SOCKET_MODEL = require('../../socket/models/index.js');
const { default: axios } = require("axios");

var group = require('../../../helpers/group.js')

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
const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];

var allGroupPiLabel = ""
group.getAllGroupPiLabels(function(array1){
	allGroupPiLabel = array1
})

var allGroupCarLabel = ""
group.getAllGroupCarLabels(function(array1){
	allGroupCarLabel = array1
})

APP.get(`${VARS.base_route}/:groupID/rules`,async(req,res)=>{
    pi_json.forEach(pi => {
		if (pi.GroupID == req.params.groupID) {
			pi_ip = pi.location.split(':')[0];
        }
    })
	axios.get(`http://`+ pi_ip + `/api/dynamic-security/rules`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        _result = jsonObj;
        res.json({
			"data": _result
		});
    }).catch((err) => {
		res.json({
			"error": err
		})
    })
});


APP.get(`${VARS.base_route}/:groupID/cars`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	axios.get(`http://`+ pi_ip + `/api/cars`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        _result = jsonObj;
        res.json({
			"data": _result
		});
    }).catch((err) => {
		res.json({
			"error": err
		})
    })
});

APP.get(`${VARS.base_route}/:groupID/is-config-uploaded`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	axios.get(`http://`+ pi_ip + `/api/is-config-uploaded`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        _result = jsonObj;
        res.json({
			"data": _result
		});
    }).catch((err) => {
		res.json({
			"error": err
		})
    })
});

APP.get(`${VARS.base_route}/:groupID/cars-label`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	axios.get(`http://`+ pi_ip + `/api/cars-label`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        _result = jsonObj;
        res.json({
			"data": _result
		});
    }).catch((err) => {
		res.json({
			"error": err
		})
    })
});

// --------------------------- Create Dynamic Rule --------------------------------

APP.post(`${VARS.base_route}/:groupID/rule`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })


	var bodyFormData = {
		'name': req.body.name,
		'active': req.body.active ? 1 : 0,
		'day': req.body.day,
		'from': req.body.from,
		'from_minutes': req.body.from_minutes,
		'to': req.body.to,
		'to_minutes': req.body.to_minutes,
		'group': req.body.group,
		'cars': req.body.cars
	};

	axios.post('http://' + pi_ip + '/api/lm-dynamic-security/rule', bodyFormData)
	.then(function (response) {
		res.status(200).json("true");
	}).catch(error => {

		res.status(500).json("false");
	});
});

// --------------------------- Update Dynamic Rule --------------------------------

APP.post(`${VARS.base_route}/:groupID/rule/:ruleID`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	var bodyFormData = {
		'name': req.body.name,
		'active': req.body.active ? 1 : 0,
		'day': req.body.day,
		'from': req.body.from,
		'from_minutes': req.body.from_minutes,
		'to': req.body.to,
		'to_minutes': req.body.to_minutes,
		'group': req.body.group,
		'cars': req.body.cars
	};

	axios.post('http://' + pi_ip + '/api/lm-dynamic-security/rule/'  + req.params.ruleID, bodyFormData)
    .then(function (response) {
		res.status(200).json("true");
	}).catch(error => {
		res.status(500).json(error);
	});

});

// --------------------------- Delete Dynamic Rule --------------------------------

APP.post(`${VARS.base_route}/:groupID/rule/:ruleID/delete`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })


	axios({
		method: 'post',
		url: 'http://' + pi_ip + '/api/dynamic-security/rule/'  + req.params.ruleID + '/delete',
	}).then(function (response) {
		res.status(200).json("true");
	}).catch(error => {
		res.status(500).json(error);
	});
});

// --------------------------- Activate Dynamic Rule --------------------------------

APP.post(`${VARS.base_route}/:groupID/rule/:ruleID/activate`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	axios({
		method: 'post',
		url: 'http://' + pi_ip + '/api/dynamic-security/rule/'  + req.params.ruleID + '/activate',
		headers: { 'Content-Type': 'multipart/form-data' }
	}).then(function (response) {
		res.status(200).json("true");
	}).catch(error => {
		res.status(500).json("false");
	});
});

// --------------------------- Deactivate Dynamic Rule --------------------------------

APP.post(`${VARS.base_route}/:groupID/rule/:ruleID/deactivate`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })

	axios({
		method: 'post',
		url: 'http://' + pi_ip + '/api/dynamic-security/rule/'  + req.params.ruleID + '/deactivate',
		headers: { 'Content-Type': 'multipart/form-data' }
	}).then(function (response) {
		res.status(200).json("true");
	}).catch(error => {
		res.status(500).json("false");
	});
});

// ---------------------------- Get Dynamic Floor Controll ------------------------------

APP.get(`${VARS.base_route}/:groupID/get-floor-control`,async(req,res)=>{
	var pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
    pi_json.forEach(pi => {
		if (pi.GroupID == req.params.groupID) {
			pi_ip = pi.location.split(':')[0];
        }
    })
	axios.get(`http://`+ pi_ip + `/api/dynamic-security/floor-control`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        _result = jsonObj;
        res.json({
			"data": _result
		});
    }).catch((err) => {
		res.json({
			"error": err
		})
    })
});

// ---------------------------- Set Dynamic Floor Controll ------------------------------

APP.post(`${VARS.base_route}/:groupID/set-floor-control`,async(req,res)=>{
	var pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
    pi_json.forEach(pi => {
		if (pi.GroupID == req.params.groupID) {
			pi_ip = pi.location.split(':')[0];
        }
    })
	var bodyFormData = {
		'group': req.body.group,
		'control': req.body.control
	};

	axios.post('http://' + pi_ip + '/api/dynamic-security/floor-control', bodyFormData)
    .then(function (response) {
		axios.get(`http://`+ pi_ip + `:3000/restart_containers?sync=false`, {timeout: 20000}).then((stdout) => {
			res.status(200).json("true");
		})
	}).catch(error => {
		res.status(500).json(error);
	});
});


module.exports = APP;