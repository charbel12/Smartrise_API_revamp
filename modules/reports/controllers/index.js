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

ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes

APP.post(`${VARS.base_route}/:reportType`,(req,res)=>{
	var payload = req.body
	var reportType = req.params.reportType
	var func = ""
	switch (reportType) {
		case "carcalls-floor":
			func = "carCallsFloor"
			break;
		case "carcalls-time":
			func = "carCallsTime"
			break;
		case "car-use":
			func = "carUse"
			break;
		case "door-times":
			func = "doorTimes"
			break;
		case "fault-history":
			func = "faultHistory"
			break;
		case "alarm-history":
			func = "alarmHistory"
			break;
		case "fault-summary":
			func = "faultSummary"
			break;
		case "floor-to-floor":
			func = "floorToFloor"
			break;
		case "hallcalls-floor":
			func = "hallCallsFloor"
			break;
		case "hallcalls-time":
			func = "hallCallsTime"
			break;
		case "wait-time-ave-time-day":
			func = "waitTimeAveTimeDay"
			break;
		case "wait-time-ave-floor":
			func = "waitTimeAveTimeFloor"
			break;
		case "fault-history":
			func = "faultHistory"
			break;
		case "alarm-history":
			func = "alarmHistory"
			break;
		case "in-service-overview":
			func = "inServiceOverview"
			break;
		case "program-events":
			func = "programEvents"
			break;
		case "wait-times-longest":
			func = "waitTimesLongest"
			break;
		case "wait-times-distribution-wait-time-up":
			func = "waitTimesDistributionUp"
			break;
		case "wait-times-distribution-wait-time-down":
			func = "waitTimesDistributionDown"
			break;
		case "wait-times-distribution-wait-time":
			func = "waitTimesDistributionWaitTime"
			break;
		case "out-of-service":
			func = "outOfService"
			break;
	}
	MODEL[func](payload,function(err,result){
		res.json({
			successful: (err ? false : true),
			message: (err ? err : ""),
			data: result,
			recordsFiltered: result.length,
			recordsTotal: result.length
		});
	});
});


module.exports = APP;