const VARS = require('../vars.js');
const express = require('express');
const APP = express();
const MODEL = require('../models/index.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const bcrypt = require('bcryptjs');
var db = require('../../../helpers/mysqlConnector.js')
const bp = require('body-parser');


APP.use(bp.urlencoded({ extended: true }));

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

APP.post(`${VARS.base_route}`, async(req, res, next) => {
    MODEL.createRole(req, res, function(err, result) {
        return result
    })
})

APP.post(`${VARS.base_route}/:rolename`, async(req, res, next) => {
    MODEL.checkAvailability(req, res, function(err, result) {
        return result
    })
})

APP.get(`${VARS.base_route}/:id`, async(req, res, next) => {
    MODEL.getRole(req, res, function(err, result) {
        return result
    })
});

APP.get(`${VARS.base_route}`, async(req, res, next) => {
    MODEL.getAllRoles(req, res, function(err, result) {
        return result
    })
});


APP.put(`${VARS.base_route}/:id`, async(req, res, next) => {
    MODEL.updateRole(req, res, function(err, result) {
        return result
    })
})

APP.get(`/permissions`, async(req, res, next) => {
    MODEL.getPermissions(req, res, function(err, result) {
        return result
    })
});


APP.delete(`${VARS.base_route}/:id`, async(req, res, next) => {
    MODEL.deleteRole(req, res, function(err, result) {
        return result
    })
})




module.exports = APP;