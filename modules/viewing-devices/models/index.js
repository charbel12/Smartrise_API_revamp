const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE = VARS.table_name;
const TOOLS = require('../../../helpers/tools.js');

module.exports = {
    datatables: async function(data, callback = null){
            var async = require('async'),
                QueryBuilder = require('datatable');

            var tableDefinition = {
                sFromSql: TABLE.devices
            };

            if(typeof data.mac !== "undefined" && data.mac){
                tableDefinition.sWhereAndSql = ` mac_address != ${"\""+data.mac.toString()+"\""}`;
            }
    
            var queryBuilder = new QueryBuilder(tableDefinition);
             
            // requestQuery is normally provided by the DataTables AJAX call
            var requestQuery = {
                start: 0,
                length: 10,
                search: {
                    value:"",
                    regex: false
                }
            };
    
            var opts = TOOLS.extendDefaults(requestQuery, data);
                opts = TOOLS.datatableColumnName(opts);

            // Build an object of SQL statements
            var queries = queryBuilder.buildQuery(opts);
            
            // Connect to the database
            var _params = {
                recordsTotal: function(cb) {
                    mysql.pool(queries.recordsTotal,[], function(error, results) {
                        cb(error, results);
                    });
                },
                select: function(cb) {
                    mysql.pool(queries.select,[], function(error, results) {
                        cb(error, results);
                    });
                },
            };
    
            if (opts.search.value != "") {
                _params["recordsFiltered"] = function(cb) {
                    mysql.pool(queries.recordsTotal,[], function(error, results) {
                        cb(error, results);
                    });
                }
            }
    
            async.parallel(
                _params,
                function(err, results) {
                    callback(err,queryBuilder.parseResponse(results));
                }
            );
    },
    create: async (params, user, callback=null) =>{
        try{

            let keys = Object.keys(params);
            let count = {};
            let i=1;
            for(let key of keys){

                let address = params[key];
                var ip = address.ipv4
                if (ip.startsWith("192") && ! ip.endsWith("1.1")) {
                    let defaults = {
                        name: null,
                        mac_address: null,
                        ip_address: null,
                        created_by: null
                    }
    
                    let args = TOOLS.extendDefaults(defaults, {mac_address: address.mac, ip_address: address.ipv4 ? address.ipv4 : null, created_by: user});
                    
                    try{
                        await module.exports.createDevice(args);
                        count = {...count, inserted: i++};
                    }catch(err){

                        count = {...count, failed: i++};
                    }
                }
            }
            callback("", {success: true, message: "scan completed!", counts: count, data: params});

        }catch(err){
            callback(err);
        }
    },
    get: async (device_id,callback=null) =>{
        try{
           await mysql.pool(`SELECT d.*, di.id AS device_info_id, di.device_id, di.elevator_view_format, di.devices_banks_info_id, di.user_login_requirements, di.devices_user_info_id, di.controls,
            evi.id AS elevator_view_info_id, evi.elevator_view_format_id, evi.visible_elevator_view, evi.layout, evi.layout_option FROM ${TABLE.devices} d
            LEFT JOIN ${TABLE.devices_info} di ON(di.device_id = d.id)
            LEFT JOIN ${TABLE.elevator_view_info} evi ON(evi.device_info_id = di.id)
            WHERE d.id= ?`, [device_id], function(err, result){
                        callback(err,result[0]);
                    });
        }catch(err){
            throw err;
        }
    },
    update: async (params, devices_id, modified_by, callback=null) =>{
        try{

            let devices = {
                name: params.name ? params.name : null
            };

            let devices_info = {
                elevator_view_format: params.elevator_view_format ? params.elevator_view_format : null,
                user_login_requirements: params.user_login_requirements !== "" || params.user_login_requirements !== null ? params.user_login_requirements : null,
                controls: params.controls ? JSON.stringify(params.controls) : null
            }

            let elevator_view = {
                visible_elevator_view: params.visible_elevator_view ? JSON.stringify(params.visible_elevator_view) : null,
                layout: params.layout ? params.layout : null,
                layout_option: params.layout_option ? params.layout_option : null
            }
            
            await mysql.pool(`UPDATE ${TABLE.devices} SET ?, modified_by = ?, date_modified=utc_timestamp() WHERE id = ?`, [devices, modified_by, devices_id], async (err, result) =>{
                if(result){

                    let banks = params.banks ? params.banks : [];

                    await module.exports.deleteDevicesBanks(devices_id);
                    if(banks.length > 0){
                        
                        for(let bank of banks){
                            await module.exports.insertBanks({
                                device_id: devices_id,
                                bank_id: bank.id,
                                bank_name: bank.name
                            });
                        }
                    }
                    
                    let users = params.user_ids ? params.user_ids : [];
                    
                    await module.exports.deleteDevicesUsers(devices_id);
                    if(users.length > 0){
                        for(let user of users){
                            await module.exports.insertUsers({
                                device_id: devices_id,
                                user_id: user
                            });
                        }
                    }

                    mysql.pool(`UPDATE ${TABLE.devices_info} SET ? WHERE device_id = ?`, [devices_info, devices_id], (a, b) =>{
                        if(b){
                            mysql.pool(`SELECT id FROM ${TABLE.devices_info} WHERE device_id = ?`, [devices_id], (e, f) =>{
                                const device_info_id = f[0]['id']; 
                                mysql.pool(`UPDATE ${TABLE.elevator_view_info} SET ? WHERE device_info_id = ?`,[elevator_view, device_info_id], async (c, d) =>{
                                   
                                    if(d){
                                        // Delete raw/temp data
                                        await module.exports.deleteElevatorViewInfo();
                                        await module.exports.deleteDevicesInfo();
                                        await module.exports.deleteDevices();
    
                                    }

                                    callback(c, d);
                                });
                            })
                        }else{
                            callback(a.message);
                        }
                    });

                   

                }else{
                    callback(err.message)
                }
            });
        }catch(err){
           callback(err);
        }
    },

    getUsers: function (req, res, callback = null){
        var ids = req.body.user_ids
        mysql.pool(
            `SELECT 
            users.id,
            users.username,
            roles.name as roles
            FROM
                users,roles,user_roles
            where
                users.id IN (${ids})
            AND
                users.id = user_roles.user_id
            AND
                user_roles.role_id = roles.id
            ;`,[] ,
            function (err, result) {
                if(err){
                    callback("", res.status(402).json({
                        "successful": false,
                        "message": "Error",
                    }))
                }
                callback("", res.status(200).json({
                    "successful": true,
                    "message": null,
                    "result": result
                }))
            })
    },
    createDevice: async (params) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`SELECT COUNT(id) AS count FROM ${TABLE.devices} WHERE mac_address = ?`, [params.mac_address], async (e, res) =>{
                if(res[0].count <= 0){
                    
                    try{
                        let x = await module.exports.insertDevices(params);
                        let y = await module.exports.insertDeviceInfo(x.insertId);
                        await module.exports.insertElevatorView(y.insertId, y.insertId);
                        resolve(true);
                    }catch(err){
                        throw err;
                    }
                }else{
                    reject("Existing!")
                }
            });
        })       
    },
    insertDevices: async (args) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE.devices} SET ?, date_created = utc_timestamp()`,[args], (err,result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    insertDeviceInfo: async (device_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE.devices_info} SET device_id = ?`, [device_id], (a, b) =>{
                if(b){
                    resolve(b);
                }else{
                    reject(a);
                }
            })
        })
    },
    insertElevatorView: async (device_info_id, elevator_view_format_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE.elevator_view_info} SET device_info_id = ?, elevator_view_format_id = ?`, [device_info_id, elevator_view_format_id], (c, d) =>{
                if(d){
                    resolve(d);
                }else{
                    reject(c);
                }
            });
        })
    },
    loginView: async (mac) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`SELECT d.id, di.user_login_requirements AS login_requirements FROM ${TABLE.devices} d LEFT JOIN ${TABLE.devices_info} di ON (di.device_id = d.id) WHERE d.mac_address = ? ORDER BY d.id LIMIT 1;`, [mac], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        })
    },
    elevatorView: async (mac) =>{
        return new Promise((resolve, reject) =>{
            //JSON_ARRAY(GROUP_CONCAT(JSON_OBJECT('id', dbi.bank_id, 'name', dbi.bank_name)))
            mysql.pool(`SELECT 
                    d.id,
                    di.elevator_view_format AS view_format,
                    (CASE WHEN (di.elevator_view_format = 2) THEN evi.layout ELSE NULL END) AS view_format_value,
                    (CASE WHEN (di.elevator_view_format = 1) THEN evi.visible_elevator_view ELSE evi.layout_option END) AS formats,
                    di.controls AS controls,
                    JSON_REMOVE(JSON_OBJECTAGG(IFNULL(dbi.bank_id, 'NULL__'), dbi.bank_name), '$.NULL__') AS banks
                FROM
                    ${TABLE.devices} d
                        LEFT JOIN
                    ${TABLE.devices_info} di ON (di.device_id = d.id)
                        LEFT JOIN
                    ${TABLE.elevator_view_info} evi ON (evi.device_info_id = di.id)
                        LEFT JOIN
                    ${TABLE.devices_banks_info} dbi ON (dbi.device_id = d.id)
                    WHERE d.mac_address = ?
                ORDER BY d.id
                LIMIT 1;`, [mac], (err, result) =>{
                    if(result){
                        resolve(result);
                    }else{
                        reject(err);
                    }
                });
        });
    },
    insertBanks: async (params) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE.devices_banks_info} SET ?`, [params], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        })  
    },
    insertUsers: async (params) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE.devices_user_info} SET ?`, [params], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        });
    },
    getDevicesBanks: async (device_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`SELECT bank_id, bank_name FROM ${TABLE.devices_banks_info} WHERE device_id = ?`, [device_id], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        });
    },
    getDevicesUsers: async (device_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`SELECT user_id FROM ${TABLE.devices_user_info} WHERE device_id = ?`, [device_id], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
    deleteDevicesBanks: async (device_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`DELETE FROM ${TABLE.devices_banks_info} WHERE device_id = ?`, [device_id], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    },
    deleteDevicesUsers: async (device_id) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`DELETE FROM ${TABLE.devices_user_info} WHERE device_id = ?`, [device_id], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        });
    },
    deleteElevatorViewInfo: async () =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`DELETE FROM ${TABLE.elevator_view_info} WHERE visible_elevator_view IS NULL AND layout IS NULL;`, [], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    },
    deleteDevicesInfo: async () =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`DELETE FROM ${TABLE.devices_info} WHERE elevator_view_format IS NULL AND devices_banks_info_id IS NULL;`, [], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        })
    },
    deleteDevices: async () =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`DELETE FROM ${TABLE.devices} WHERE name IS NULL;`, [], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }
}