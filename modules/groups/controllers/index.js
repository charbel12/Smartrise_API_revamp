const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');

ROUTER_MIDDLEWARE.USE_STANDARD(APP); 


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

APP.get(`${VARS.base_route}/:groupID/cars`, async (req, res) => {
	//TODO : extract groupdID, add a condition to return the cars of that group only, if groupdID != 1, fetch group IPs and call the function
  try {
    const result = await MODEL.getCarsWithFloors(req.params.groupID);
    res.json({
      successful: true,
      message: "",
      data: result,
    });
  } catch (err) {
    res.json({
      successful: false,
      message: err.message || "An unknown error occurred",
      data: []
    });
  }
});



module.exports = APP;