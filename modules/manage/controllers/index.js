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



ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes


APP.post(`${VARS.base_route}/users`,(req,res)=>{
    var payload = req.body
	MODEL.getAllUsersWithRoles(payload, function(err,result){
        result.message = (err ? err : "")
        result.successful = (err ? false : true)
        res.json(result);
	});
});

APP.post(`${VARS.base_route}/users-devices`, async (req, res, next) => {
    var payload = req.body
	MODEL.getUsersWithRoles(payload, function(err,result){
        result.message = (err ? err : "")
        result.successful = (err ? false : true)
        res.json(result);
	});
  })

APP.post(`${VARS.base_route}/roles`,(req,res)=>{
    var payload = req.body
	MODEL.getAllRoles(payload, function(err,result){
        res.json({
            successful: (err ? false : true),
            message: (err ? err : ""),
            data: result,
			recordsFiltered: result.length,
			recordsTotal: result.length
        });
	});
});

APP.get(`${VARS.base_route}/listroles`,(req,res)=>{
	MODEL.getAllRoleList(function(err,result){
        res.json({
            successful: (err ? false : true),
            message: (err ? err : ""),
            data: result,
			recordsFiltered: result.length,
			recordsTotal: result.length
        });
	});
});

APP.post(`${VARS.base_route}/devices`,(req,res)=>{
    var payload = req.body
	MODEL.getAllDevices(function(err,result){
        res.json({
            successful: (err ? false : true),
            message: (err ? err : ""),
            data: Object.values(result),
			recordsFiltered: Object.values(result).length,
			recordsTotal: Object.values(result).length
        });
	});
});

module.exports = APP;