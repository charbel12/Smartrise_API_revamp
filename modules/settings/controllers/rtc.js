const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS()
const axios = require('axios');
const fs = require('fs');
var ssh_exec = require('node-ssh-exec')
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes
const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];

APP.get(`${VARS.base_route}/rtc/:groupID`, function (req, res, next) {
    const group_id = req.params.groupID - 1
    pi_ip = PI[group_id].location.split(":")[0]


});

APP.get(`${VARS.base_route}/rtc/:groupID/settime`, function (req, res, next) {
    const group_id = req.params.groupID - 1
    pi_ip = PI[group_id].location.split(":")[0]

})

module.exports = APP;