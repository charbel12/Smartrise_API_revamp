const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS()
const axios = require('axios');
const fs = require('fs');
var ssh_exec = require('node-ssh-exec')
const { exec } = require('child_process');
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');

const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

APP.get(`${VARS.base_route}/io/get-selected`, function (req, res) {
    var inputs = TOOLS.getRedisKeyValue("display_inputs")
    if (inputs == null) {
        inputs = "[]"
        // TOOLS.setRedisKeyValue("display_inputs", JSON.stringify(inputs))
        exec("redis-cli -h redis_lm set display_inputs " + JSON.stringify(inputs), (err, stdout, stderr) => {
            exec("redis-cli -h redis_lm SAVE", (err, stdout, stderr) => {});
        });
    }
    var outputs = TOOLS.getRedisKeyValue("display_outputs")
    if (outputs == null) {
        outputs = "[]"
        // TOOLS.setRedisKeyValue("display_outputs", JSON.stringify(outputs))
        exec("redis-cli -h redis_lm set display_outputs " + JSON.stringify(outputs), (err, stdout, stderr) => {
            exec("redis-cli -h redis_lm SAVE", (err, stdout, stderr) => {});
        });
    }
    res.json({successful: true, inputs: inputs, outputs: outputs});
})

APP.get(`${VARS.base_route}/io/get-inputs`, async function (req, res) {

    pi_ip = pi_json[0].location.split(':')[0];

	await axios.get(`http://`+ pi_ip + `/api/get-inputs`, {timeout: 3000}).then((response) => {
        const data = response;
        all_inputs = data.data;
        res.json(all_inputs);    
    }).catch((err) => {

    })
})

APP.get(`${VARS.base_route}/io/get-outputs`, async function (req, res) {

    pi_ip = pi_json[0].location.split(':')[0];

	await axios.get(`http://`+ pi_ip + `/api/get-outputs`, {timeout: 3000}).then((response) => {
        const data = response;
        all_inputs = data.data;
        res.json(all_inputs);    
    }).catch((err) => {

    })
})

APP.post(`${VARS.base_route}/io/update-selected`, function (req, res) {
    var inputs = req.body.inputs
    var outputs = req.body.outputs
    TOOLS.setRedisKeyValue("display_inputs", JSON.stringify(inputs))
    TOOLS.setRedisKeyValue("display_outputs", JSON.stringify(outputs))
    res.json({successful: true, message: 'IO updated successfully!'});
})


module.exports = APP;