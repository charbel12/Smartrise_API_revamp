const express = require('express');
const APP = express();
const MODEL = require('../models/index.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const bp = require('body-parser');


APP.use(bp.urlencoded({ extended: true }));

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP);

APP.get(``, async(req, res, next) => {
    MODEL.getPermissions(req, res, function(err, result) {
        console.log('result: ', result)
        return result
    })
});

module.exports = APP;