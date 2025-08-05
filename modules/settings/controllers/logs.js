const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS()
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes

// smartrise-api-logs
APP.get(`${VARS.base_route}/logs/smartrise-api-logs`, function (req, res, next) {
    const file = `/var/log/app.log`;
    res.download(file, "Smartrise_API_Logs.txt"); // Set disposition and send it.
});


module.exports = APP;