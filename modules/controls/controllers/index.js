const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const TOOLS = require('../../../helpers/tools.js');

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

/**
* @route GET /controls/settings/{name}/group/{group}/car/{car}
* @Controls - Control Settings
* @group Controls - Control Settings
* @param {string} name.query.required - Control Settings Name
* @param {Integer} group_id.query.required - Group ID
* @param {Integer} car_id.query.required - Car ID
* @produces application/json
* @consumes application/json
* @returns {RolesResponse.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/settings/:name/group/:group([0-9]+)/car/:car([0-9]+)`, async (req,res)=>{
    try{

        const {name, group, car} = req.params;

        if(!name || !group || !car) throw new Error('Missing payload!');
        const payload = {name, group_id: parseInt(group), car_id: parseInt(car)};
        const result = await MODEL.get(payload);

        if(result){
            res.status(200).json({successful: true, message: 'Control Settings fetched successfully!', data: result});
        }else{
            throw new Error('Failed to fetch Control Settings.');
        }
    }catch(err){
        res.status(500).json({successful: false, message: err.message});
    }
});

/**
* @route PATCH /controls/settings/{name}/group/{group}/car/{car}
* @Controls - Control Settings
* @group Controls - Control Settings
* @param {string} name.query.required - Control Settings Name
* @param {Integer} group_id.query.required - Group ID
* @param {Integer} car_id.query.required - Car ID
* @param {Controls.model} Controls.body.required - Controls Payload
* @produces application/json
* @consumes application/json
* @returns {RolesResponse.model} 200  - Control Settings info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.patch(`${VARS.base_route}/settings/:name/group/:group([0-9]+)/car/:car([0-9]+)`, async (req,res)=>{
    try{
        const {name, group, car} = req.params;

        if(!name || !group || !car) throw new Error('Missing payload!');

        const body = req.body;
        const defaults = {};
        const payload = TOOLS.extendDefaults(defaults, body);
        
        payload.value = JSON.stringify(payload.value) || null;
    
        if(!payload || typeof payload === "undefined" || Object.keys(payload).length <= 0) throw new Error('Missing payload!');
        
        payload.group_id = group;
        payload.car_id = car;
        
        const params = {
            name,
            group_id: group,
            car_id: car,
        } 

        const result = await MODEL.update(payload, params);
        
        if(result){
            res.status(200).json({
                successful: true,
                message: "Control Settings updated successfully!",
                data: result
            });
        }else{
            throw new Error("Failed to update the Control Settings.");
        }
    }catch(err){
        res.status(500).json({successful: false, message: err.message});
    }
});

module.exports = APP;