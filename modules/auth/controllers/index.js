const VARS = require('../vars.js');
const express = require('express');
const MODEL = require('../models/index.js')
const ROUTER = express.Router();

// sign in
ROUTER.post(`${VARS.base_route}/signin`, async(req, res, next) => {

    MODEL.userSignin(req, res, function(error, status, result) {
        res.status(status).send(result)
    })
})

ROUTER.post(`${VARS.base_route}/force-change-password`, async(req, res, next) => {
    MODEL.forceChangePassword(req, res, MODEL.userSignin, function(error, status, result) {
        if (error) {
            res.status(status).send(result)
        } else {
            res.status(200).send(result)
        }
    })
})


module.exports = ROUTER;