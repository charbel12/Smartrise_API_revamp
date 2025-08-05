const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS()
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/group-config.js');
const axios = require('axios');
const MULTER = require('multer');
var fs = require('fs');

var storage = MULTER.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(process.env.Dirname + "/" + process.env.SETTINGS_GROUP_LOCATION, err => function (err, dir) {
            console.log("ERR", err);
        });
        cb(null, process.env.SETTINGS_GROUP_LOCATION)
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id)
    }
})

const UPLOAD = MULTER({
    storage: storage
});

ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes

APP.get(`${VARS.base_route}/group-config`, function (req, res, next) {
    var model = require('../models/group-config.js');
    var async = require('async');
    model.getGroupConfigFiles(function (err, data) {
        res.json({
            successful: (err ? false : true),
            message: err,
            data: data
        })
    });
});

//ROUTER_MIDDLEWARE.USE_STANDARD(APP); //for non authenticated routes
ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP); //for secured/authenticated routes

/**
* @route POST /settings/group-config/{id}
* @group Settings: Group - Pi Group Info
* @param {integer} id.path.required - group id
* @param {file} config.param.required - file
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/group-config/site-id-config`, function (req, res) {
    var site_id = req.body.site_id
    var remote_enabled = req.body.remote_enabled
    const { exec } = require('child_process');
    exec("/files/Smartrise_Local_Monitor/site_id_setter " + site_id, (err, stdout, stderr) => {
        exec("/files/Smartrise_Local_Monitor/remote_monitoring_status_setter.sh " + remote_enabled, (err, stdout, stderr) => {
            console.log('err', err)
            console.log('stderr',stderr)
            res.json({successful: true, message: 'Site ID updated successfully!', remote_enabled: remote_enabled});
        });
    });
})
const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];

APP.post(`${VARS.base_route}/group-config/:groupID/layout`,async(req,res)=>{
    pi_json.forEach(pi => {
        if (pi.GroupID == req.params.groupID) {
            pi_ip = pi.location.split(':')[0];
        }
    })
	await axios.get(`http://`+ pi_ip + `/api/layout`, {timeout: 3000}).then((response) => {
        var jsonObj = response.data;
        res.json(jsonObj);    
    }).catch((err) => {
    })
})

APP.post(`${VARS.base_route}/group-config/:id`, UPLOAD.single('config'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        res.json({ successful: false, message: 'Please upload a file' });
    }
    else {
        res.json({ successful: true });
    }
});

/**
* @route PUT /settings/group-config/{id}
* @group Settings: Group - Pi Group Info
* @param {integer} id.path.required - group id
* @param {file} config.param.required - file
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.put(`${VARS.base_route}/group-config/:id`, function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
    var _config = req.body
    _config = Object.assign({}, Object.values(_config))
    MODEL.update(_config,function(err,result){
    });
    res.json(req.body);
});

/**
* Get all Pi group info
* @route GET /settings/group-config
* @group Settings: Group - Pi Group Info
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
// APP.get(`${VARS.base_route}/group-config`, function (req, res, next) {
//     var model = require('../models/group-config.js');
//     var async = require('async');
//     model.getGroupConfigFiles(function (err, data) {
//         res.json({
//             successful: (err ? false : true),
//             message: err,
//             data: data
//         })
//     });
// });

APP.get(`${VARS.base_route}/reset-default`, function (req, res) {
    MODEL.restore(function (err, data) {
        res.json({
            successful: (err ? false : true),
            message: err,
            data: data
        })
    });
});

/**
* Get all Pi config info
* @route GET /settings/pi-config
* @group Settings: PInfo
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/pi-config`, async function (req, res, next) {
   try{
        const result = await MODEL.getPiConfig();

        if(result){
            res.status(200).json({successful: true, message: 'PI Config fetched successfully!', data: result});
        }else{
            throw new Error("Could not get PI Config!");
        }
   }catch(err){
       res.status(500).json({ successful: false, message: err.message })
   }
});

/**
* Get all Other Config info
* @route GET /settings/other-config
* @group Settings: Other Info
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/other-config`, async function (req, res, next) {
    try{
        const os = require('os');
        let osRelease;
        const ni = require('network-interfaces');

        const options = {
            internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
            ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
        };

        const interfaces = os.networkInterfaces()[ni.getInterface(options)].filter(x=>x.family==="IPv4");

        if(os.platform().toUpperCase() === "LINUX"){
            osRelease = JSON.stringify(await getOSVersion());
        }

        res.status(200).json({
            successful: true,
            message: 'Other Info fetched successfully!',
            data: {
                os: os.platform(),
                os_version: os.release(),
                site_id: process.env.SITE_ID || 0,
                remote_enabled: process.env.ENABLE_REMOTE_MONITORING || 0,
                remote_url: process.env.REMOTE_URL || null,
                app_version: process.env.APP_VERSION || null,
		        os_version_temp: osRelease || null,
                nuc_ip: interfaces[0]['address'],
            }
        })
    }catch(err){
        res.status(500).json({ successful: false, message: err.message })
    }
 });

 
/**
* Get all Network Config info
* @route GET /settings/network-config
* @group Settings: Network Config
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/network-config`, async function (req, res, next) {
    try{

        const result = await getNetworkInfo();

        res.status(200).json({
            successful: true,
            message: "Network fetch successfully!",
            data: result
        });
    }catch(err){
        res.status(500).json({ successful: false, message: err.message })
    }
 });

 /**
* Post all Network Config info
* @route POST /settings/network-config
* @group Settings: Network Config
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/network-config`, async function (req, res, next) {
    try{

        const params = {
            ip_address: req.body.ip_address,
            gateway_ip: req.body.gateway_ip,
            dns: req.body.dns,
        }

        const result = await updateNetowkInfo(params);

        if(result){
            res.status(200).json({
                successful: true,
                message: "Network Config updated successfully!",
                data: result
            });
        }else{
            throw new Error("Could not update network config!");
        }
      
    }catch(err){
        res.status(500).json({ successful: false, message: err.message })
    }
 });

 APP.post(`${VARS.base_route}/special-feature`, function (req, res) {
    var carcall_special_feature = req.body.carcall.value
    var hallcall_special_feature = req.body.hallcall.value
    const { exec } = require('child_process');
    exec("/files/Smartrise_Local_Monitor/carcall_special_feature_setter " + carcall_special_feature, (err, stdout, stderr) => {
        exec("/files/Smartrise_Local_Monitor/hallcall_special_feature_setter " + hallcall_special_feature, (err, stdout, stderr) => {
            res.json({successful: true, message: 'Special Feature updated successfully!'});
        });
    });

});


 const getOSVersion = async () =>{
    const {exec} = require('child_process');
            
    return new Promise((resolve, reject) =>{

        exec('cat /etc/os-release', (err, stdout, stderr) => {
            let lines = stdout.split('\n');
            let result = {};

            lines.forEach((val, i)=>{
                const _v = val.split('=');
            
                if(_v[0].toLocaleString() === "NAME"){
                    result = {...result, name: _v[1]};
                }
            
                if(_v[0].toLocaleString() === "VERSION"){
                    result = {...result, version: _v[1]}
                    resolve(result);
                    return;
                }
            });                 
            
        });
    });
 }

 const getNetworkInfo = () =>{

    const OS = require('os');
    const NETWORK = OS.networkInterfaces();
    const ni = require('network-interfaces');
    const defaultGateway = require('default-gateway');
    const {gateway} = defaultGateway.v4.sync();
    const dns = require('dns');

    const options = {
        internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
        ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
    };

    const interfaces = OS.networkInterfaces()[ni.getInterface(options)].filter(x=>x.family==="IPv4");
    
    const result = {
        ip_address: interfaces[0]['address'],
        netmask: interfaces[0]['netmask'],
        gateway_ip: gateway,
        dns: {
            preferred: dns.getServers().length > 1 ? dns.getServers()[0] : null,
            alternate: dns.getServers().length > 1 ? dns.getServers()[1] : dns.getServers()[0]
        },
        interface: ni.getInterface(options),
        interfaces,
        network: NETWORK,
    };

    return result;
 }

 const updateNetowkInfo = (params) =>{
     
     try{
        const os = require("os");

        if(os.platform() === "win32"){
            throw new Error("OS not supported!");
        }

        const set_ip_address = require('set-ip-address');
        const ni = require('network-interfaces');
    
        const options = {
            internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
            ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
        };
    
        let interface = {
            interface: ni.getInterface(options),
            ip_address: params.ip_address,
            prefix: 20,
            gateway: params.gateway_ip,
            nameservers: params.dns,
        }

        if(!params.dns.length){
            delete interface.nameservers;
        }
    
        const result = set_ip_address.configure([interface]).then(() =>{ return true});

        
        if(result){
            set_ip_address.restartService().then(() => console.log('network service restarted'));
            return result;
        }else{
            return false;
        }
    }catch(err){
        throw err;
    }       
 }

module.exports = APP;