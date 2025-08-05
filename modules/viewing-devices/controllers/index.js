const VARS = require('../vars.js');
const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const MODEL = require('../models/index.js');
const PING = require('ping');

ROUTER_MIDDLEWARE.USE_STANDARD(APP);

/**
* @route GET /viewing-devices/login-view
* @group Devices - Viewing Devices Management
* @produces application/json
* @param {string} mac - mac address
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/login-view`, async (req, res) =>{
    try{
        let {auto_detect = false, ip = ""} = req.body;
           // auto_detect = typeof auto_detect === "boolean" ? auto_detect : typeof auto_detect === "string" ? parseInt(auto_detect) : Boolean(auto_detect);
        let macAddress = "";
        
        let arp = [];
        if((ip && TOOLS.formatIP(ip)) || auto_detect){
            await TOOLS.scan(ip, 1).then(x=>{
                if(x.length > 0){
                    arp = [...arp, x[0]];   
                }
            });
            
            macAddress = arp.length > 0 ? arp[0].mac : 0;
            
            if(macAddress !== 0){

                let result = await MODEL.loginView(macAddress);

                if(result.length > 0){
                    res.json({successful: true, message: "Device login requirements successfully fetch!", mac: macAddress, result: result[0]});
                }else{
                    throw new Error("Could not fetch login requirements!");
                }
            }else{
                throw new Error("IP address is not in the network pool!");
            }
            
        }else{
            throw new Error("Missing payload. Please try again!");
        }
    }catch(err){
        res.json({successful:false, message: err.message});
    }
});

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP);

/**
* @route POST /viewing-devices/datatables
* @group Devices - Viewing Devices Management
* @param {DatatablePayload.model} DatatablePayload.body - the new point
* @produces application/json
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of user info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/datatables`, async (req,res) =>{
    try{

        const {IP = ""} = req.body;

        let mac = "", arp = [];
	
        await TOOLS.scan(IP, 1).then(x=>{
            if(x.length > 0){
                arp = [...arp, x[0]];   
            }
        });

        mac = arp.length > 0 ? arp[0].mac : null;

        req.body.mac = mac;
        
        await MODEL.datatables(req.body, function(err, results){
            res.json(results);
        });
    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

/**
* @route POST /viewing-devices/scan
* @group Devices - Viewing Devices Management
* @produces application/json
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/scan`, async (req, res) =>{
    try{
        let result = [];
        await TOOLS.scan(1).then(x=>{
        	x = x.filter(y=>{
                if(TOOLS.formatMAC(y.mac)){
                    return y;
                }
            });
            result = [...result, x];
        });
        
        if(result.length > 0){

            await MODEL.create(result[0], req.user.username, (a, b) =>{
                if(b && !a){
                    res.json({successful: true, message: 'Scan completed!', data: {result: result, counts: b.counts}});
                }else{
                    res.json({successful: false, message: a});
                }
            });
        }else{
            throw new Error("Missing payload!");
        }
        
    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

/**
* @route POST /viewing-devices/elevator-view
* @group Devices - Viewing Devices Management
* @produces application/json
* @param {string} mac - mac address
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/elevator-view`, async (req, res) =>{
    try{
        let {auto_detect = false, ip = ""} = req.body;
           // auto_detect = typeof auto_detect === "boolean" ? auto_detect : typeof auto_detect === "string" ? parseInt(auto_detect) : Boolean(auto_detect);
        let macAddress = "";
        
        let arp = [];
        if((ip && TOOLS.formatIP(ip)) || auto_detect){
            await TOOLS.scan(ip, 1).then(x=>{
                if(x.length > 0){
                    arp = [...arp, x[0]];   
                }
            });
            
            macAddress = arp.length > 0 ? arp[0].mac : 0;
            
            if(macAddress !== 0){
                let result = await MODEL.elevatorView(macAddress);

                if(result){
                    res.json({successful: true, message: "Device elevator view successfully fetch!", mac: macAddress, result: result[0]});
                }else{
                    throw new Error("Could not fetch elevator view!");
                }
            }else{
                res.json({successful: true, message: "IP address is not in the network pool!", mac: '', result: {}});
                //throw new Error("IP address is not in the network pool!");
            }
            
        }else{
            throw new Error("Missing payload. Please try again!");
        }
    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

/**
* @route GET /viewing-devices/:id
* @group Devices - Viewing Devices Management
* @produces application/json
* @param {integer} device_id - device id
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.get(`${VARS.base_route}/:device_id([0-9]+)`, async (req, res) =>{
    try{
        let {device_id = ""} = req.params;
        if(device_id){
            await MODEL.get(device_id, async (err, results) =>{
                if(results){

                    results.banks = await MODEL.getDevicesBanks(device_id);
                    results.users = await MODEL.getDevicesUsers(device_id);
                    if(results.users.length > 0){
                        results.users = results.users.map(x=>{return x.user_id});
                    }

                    res.json({successful: true, message: "Device successfully fetched!", data: results});
                }else{
                    throw new Error(err.message);
                }
            });
        }else{
            throw new Error("Missing device id!");
        }        
    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

/**
* @route PUT /viewing-devices/:id
* @group Devices - Viewing Devices Management
* @produces application/json
* @param {integer} device_id - device id
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.put(`${VARS.base_route}/:device_id([0-9]+)`, async (req, res) =>{
    try{
        let modified_by = req.user.username ? req.user.username : '';
        let device_id = req.params.device_id;
        await MODEL.update(req.body, device_id, modified_by, function(err, result){
            if(result && !err){
                res.json({successful: true, message: 'Device updated successfully!'});
            }else{
                res.json({successful: false, message: err});
            }
        });
        
    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

/**
* @route POST /viewing-devices/ping
* @group Devices - Viewing Devices Management
* @produces application/json
* @param {string} ip - ip address
* @consumes application/json
* @returns {ResponseCode.model} 200 - An object of info
* @returns 401 - Access is denied.
* @security JWT
*/
APP.post(`${VARS.base_route}/ping`, async (req, res) =>{
    try{
        const {IP ="" } = req.body;
        
        if(IP){
            if(TOOLS.formatIP(IP)){
                let result = await PING.promise.probe(IP).then((value)=>{
                    return {alive: value.alive, output: value.output};
                });
    
                res.json({successful: true, message: 'Ping successful!', response: result});
            }else{
                throw new Error("Please check your IP format!");
            }
        }else{
            throw new Error("Missing payload!");
        }

    }catch(err){
        res.json({successful: false, message: err.message});
    }
});

APP.post(`/users/viewing-devices/users`, async (req, res, next) => {
    MODEL.getUsers(req, res, function(err,result){
      return result
    })
  })

// /**
// * @route POST /viewing-devices/users
// * @group Devices - Viewing Devices Management
// * @produces application/json
// * @param {string} user_ids - user id
// * @consumes application/json
// * @returns {ResponseCode.model} 200 - An object of info
// * @returns 401 - Access is denied.
// * @security JWT
// */
// APP.post(`${VARS.base_route}/users`, async (req, res) =>{
//     try{
//         let {user_ids = []} = req.body;

//         if(user_ids.length > 0){
//             user_ids = "\""+user_ids.join("\", \"")+"\"";
            
//             let result = await USER_MODEL.getById(user_ids);
            
//             if(result){
//                 res.json({successful: true, message: "Successfully retrieved user devices!", result: result});
//             }else{
//                 throw new Error("Could not retrieve user devices!");
//             }
//         }
//     }catch(err){
//         res.json({successful: false, message: err.message});
//     }
// });

module.exports = APP;