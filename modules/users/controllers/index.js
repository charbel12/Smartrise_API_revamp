const VARS = require('../vars.js');
const express = require('express');
const APP = express();
const MODEL = require('../models/index.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const bp = require('body-parser');
APP.use(bp.json());

APP.use(bp.urlencoded({ extended: true }));

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP);

APP.post(`${VARS.base_route}`, async(req, res, next) => {
    MODEL.createUser(req, res, function(err, result) {
        return result
    })
})

APP.get(`${VARS.base_route}`, async(req, res, next) => {
    MODEL.getAllUsers(req, res, function(err, result) {
        return result
    })
})

APP.post(`${VARS.base_route}/:username`, async(req, res, next) => {
    MODEL.checkAvailability(req, res, function(err, result) {
        return result
    })
})

//get user data by id
APP.get(`${VARS.base_route}/:id`, async(req, res, next) => {
    MODEL.getUserById(req, res, function(err, result) {
        return result
    })
});

APP.get(`${VARS.base_route}/:id/role`, async(req, res, next) => {
    MODEL.getUserRole(req, res, function(err, result) {
        return result
    })
});

APP.get(`/users`, async(req, res, next) => {
    MODEL.getAllUsers(req, res, function(err, result) {
        return result
    })
});

APP.delete(`${VARS.base_route}/:id/delete`, async(req, res, next) => {

    MODEL.deleteUserById(req, res, function(err, result) {
        return result
    })
})


// TODO - update user by id
APP.put(`${VARS.base_route}/:id`, async(req, res, next) => {
    MODEL.updatetUserById(req, res, function(err, result) {
        return result
    })
})

APP.post(`${VARS.base_route}/:id/roles`, async(req, res, next) => {
    MODEL.updateUserRole(req, res, function(err, result) {
        return result
    })
})

APP.post(`${VARS.base_route}/:id/reset-password`, async(req, res, next) => {
    MODEL.updateUserPass(req, res, function(err, result) {
        return result
    })
})


module.exports = APP;