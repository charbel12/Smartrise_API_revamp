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
    var group_id = req.params.groupID - 1
    pi_ip = PI[group_id].location.split(":")[0]

    command = 'date +%Y-%m-%d/%H:%M:%S';

    axios.get(`http://`+ pi_ip + `/api/system/settings`, {timeout: 1000}).then((stdout) => {
        response = stdout.data.datetime
        timezone = stdout.data.timezone
        let date_ob = new Date(response);
        date_ob = date_ob.toLocaleString('en-US', {timeZone: timezone})
        date_ob  = new Date(date_ob)
            // current day
            // adjust 0 before single digit date
            let day = ("0" + date_ob.getDate()).slice(-2);
        
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
            // current year
            let year = date_ob.getFullYear();
        
            // current hours
            let hours = date_ob.getHours();
        
            // current minutes
            let minutes = date_ob.getMinutes();
        
            // current seconds
            let seconds = date_ob.getSeconds();
        
            res.json({
                day: day,
                month: month,
                year: year,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            });
    }).catch((err) => {
        throw err;
    })
});

APP.get(`${VARS.base_route}/rtc/:groupID/settime`, function (req, res, next) {
    var group_id = req.params.groupID - 1
    pi_ip = PI[group_id].location.split(":")[0]
    axios.get(`http://`+ pi_ip + `:3000/settime`, {timeout: 20000}).then((stdout) => {
        axios.get(`http://`+ pi_ip + `:3000/restart-middleware`, {timeout: 20000}).then((stdout) => {
            axios.get(`http://`+ pi_ip + `:3000/restart-gui`, {timeout: 20000}).then((stdout) => {
                res.json({
                    success:true
                });
            })
        })
    })
})

module.exports = APP;