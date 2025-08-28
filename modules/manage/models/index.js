const { tableName } = require('../vars.js');
const mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');
const async = require('async');
const moment = require('moment')
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const QueryBuilder = require('datatable');

module.exports = {
    getAllUsersWithRoles: function (data, callback = null) {
var role_id = data.role_id ? `AND roles.id = ${data.role_id}` : ``
var status = data.status ? ` AND users.status = ${data.status} ` : ``

        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            //sTableName: 'rpt_wait',
            sSelectSql: "*",
            sFromSql: `
            (
                SELECT 
                    users.id,
                    users.username,
                    users.first_name,
                    users.last_name,
                    users.email,
                    COALESCE(roles.name, "N/A") as role,  -- Use COALESCE to return "N/A" if the role is NULL
                    users.status
                FROM
                    users
                    LEFT JOIN user_roles ON users.id = user_roles.user_id
                    LEFT JOIN roles ON user_roles.role_id = roles.id
                WHERE
                    1=1
                    ${role_id}
                    ${status}
                ORDER BY 
                    users.id
            ) as sqQ
        `,
        
            //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
            aSearchColumns: ['username', 'first_name', 'last_name', 'email', 'role', 'status']
        };

        var queryBuilder = new QueryBuilder(tableDefinition);

        // requestQuery is normally provided by the DataTables AJAX call
        var requestQuery = {
            start: 0,
            length: 10,
            search: {
                value: "",
                regex: false
            }
        };

        var opts = TOOLS.extendDefaults(requestQuery, data);
        opts = TOOLS.datatableColumnName(opts);


        // Build an object of SQL statements
        var queries = queryBuilder.buildQuery(opts);
        // Connect to the database
        var _params = {
            recordsTotal: function (cb) {

                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            },
            select: function (cb) {
                mysql.pool(queries.select, [], function (error, results) {

                    cb(error, results);
                });
            },
        };

        if (opts.search.value != "") {
            _params["recordsFiltered"] = function (cb) {
                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            }
        }

        async.parallel(
            _params,
            function (err, results) {
                callback(err, queryBuilder.parseResponse(results));
            }
        );


    },

    getUsersWithRoles: function (data, callback = null) {
        var device_id = data.device_id
        var role_name = data.role ? ` AND roles.name = '${data.role}'` : ``
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            //sTableName: 'rpt_wait',
            sSelectSql: "*",
            sFromSql: `
                                ( SELECT 
                                users.id,
                                users.username,
                                users.first_name,
                                users.last_name,
                                users.email,
                                IF(roles.name is NULL,"N/A",roles.name) as role,
                                users.status
                            FROM
                                users
                                LEFT JOIN
                                    user_roles on user_roles.user_id = users.id
                                LEFT JOIN 
                                    roles on user_roles.role_id = roles.id
                                ${role_name}
                                )as sqQ            `,
                                //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
                                aSearchColumns: ['username', 'first_name', 'last_name', 'email', 'role', 'status']
                            };
                    
                            var queryBuilder = new QueryBuilder(tableDefinition);
                    
                            // requestQuery is normally provided by the DataTables AJAX call
                            var requestQuery = {
                                start: 0,
                                length: 10,
                                search: {
                                    value: "",
                                    regex: false
                                }
                            };
                    
                            var opts = TOOLS.extendDefaults(requestQuery, data);
                            opts = TOOLS.datatableColumnName(opts);
                    
                    
                            // Build an object of SQL statements
                            var queries = queryBuilder.buildQuery(opts);
                            // Connect to the database
                            var _params = {
                                recordsTotal: function (cb) {
                    
                                    mysql.pool(`SELECT Count
                                    (users.id)      
                                FROM
                                    users,user_roles,roles
                                    where
                                    user_roles.user_id = users.id
                                    AND
                                    user_roles.role_id = roles.id
                                    AND
                                    users.id NOT in (Select devices_user_info.user_id from devices_user_info where devices_user_info.device_id = ${device_id})
                                    ${role_name}
                                    `, [], function (error, results) {
                                        cb(error, results);
                                    });
                                },
                                select: function (cb) {
                                    mysql.pool(`SELECT 
                                    users.id,
                                    users.username,
                                    users.first_name,
                                    users.last_name,
                                    users.email,
                                    IF(roles.name is NULL,"N/A",roles.name) as role,
                                    users.status
                                FROM
                                    users,user_roles,roles
                                    where
                                    user_roles.user_id = users.id
                                    AND
                                    user_roles.role_id = roles.id
                                    AND
                                    users.id NOT in (Select devices_user_info.user_id from devices_user_info where devices_user_info.device_id = ${device_id})
                                    ${role_name}`, [], function (error, results) {
                                        cb(error, results);
                                    });
                                },
                            };
                    
                            if (opts.search.value != "") {
                                _params["recordsFiltered"] = function (cb) {
                                    mysql.pool(`SELECT Count
                                    (users.id)      
                                FROM
                                    users,user_roles,roles
                                    where
                                    user_roles.user_id = users.id
                                    AND
                                    user_roles.role_id = roles.id
                                    ${role_name}
                                    `, [], function (error, results) {
                                        cb(error, results);
                                    });
                                }
                            }
                    
                            async.parallel(
                                _params,
                                function (err, results) {
                                    callback(err, queryBuilder.parseResponse(results));
                                }
                            )},

    getAllUsers: function (callback = null) {
        var _query = `
            SELECT 
                *
            FROM 
                users AS u
        `;
        mysql.pool(_query, [], function (err, result) {

            callback(err, result);
        })
    },
    getUserRole: function (user_id, callback = null) {
        var _query = `
            SELECT 
                name
            FROM 
                users AS p
                inner join user_roles pc on p.id = pc.user_id
                inner join roles c on pc.role_id = c.id
            WHERE p.id = ?
        `;
        mysql.pool(_query, [user_id], function (err, result) {
            callback(err, result);
        })
    },
    getAllRoleList: function (callback = null) {
        var _query = `
            SELECT 
                *
            FROM 
                roles AS r
            order by date_modified
        `;
        mysql.pool(_query, [], function (err, result) {
            callback(err, result);
        })
    },
    getAllRoles: function (data, callback = null) {

        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            //sTableName: 'rpt_wait',
            sSelectSql: "*",
            sFromSql: `
                (SELECT 
                    *
                FROM 
                    roles AS r
                order by date_modified
            )as sqQ
            `,
            //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
            aSearchColumns: ['name', 'description', 'date_modified']
        };

        var queryBuilder = new QueryBuilder(tableDefinition);

        // requestQuery is normally provided by the DataTables AJAX call
        var requestQuery = {
            start: 0,
            length: 10,
            search: {
                value: "",
                regex: false
            }
        };

        var opts = TOOLS.extendDefaults(requestQuery, data);
        opts = TOOLS.datatableColumnName(opts);


        // Build an object of SQL statements
        var queries = queryBuilder.buildQuery(opts);
        // Connect to the database
        var _params = {
            recordsTotal: function (cb) {

                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            },
            select: function (cb) {
                mysql.pool(queries.select, [], function (error, results) {
                    cb(error, results);
                });
            },
        };

        if (opts.search.value != "") {
            _params["recordsFiltered"] = function (cb) {
                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            }
        }

        async.parallel(
            _params,
            function (err, results) {
                callback(err, queryBuilder.parseResponse(results));
            }
        );


    },
    getAllDevices: function (callback = null) {

        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            //sTableName: 'rpt_wait',
            sSelectSql: "*",
            sFromSql: `
                (SELECT 
                    *
                FROM 
                    devices AS d
                order by date_created
            )as sqQ
            `,
            //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
            aSearchColumns: ['name', 'mac_address', 'ip_address']
        };

        var queryBuilder = new QueryBuilder(tableDefinition);

        // requestQuery is normally provided by the DataTables AJAX call
        var requestQuery = {
            start: 0,
            length: 10,
            search: {
                value: "",
                regex: false
            }
        };

        var opts = TOOLS.extendDefaults(requestQuery, data);
        opts = TOOLS.datatableColumnName(opts);


        // Build an object of SQL statements
        var queries = queryBuilder.buildQuery(opts);
        // Connect to the database
        var _params = {
            recordsTotal: function (cb) {

                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            },
            select: function (cb) {
                mysql.pool(queries.select, [], function (error, results) {
                    cb(error, results);
                });
            },
        };

        if (opts.search.value != "") {
            _params["recordsFiltered"] = function (cb) {
                mysql.pool(queries.recordsTotal, [], function (error, results) {
                    cb(error, results);
                });
            }
        }

        async.parallel(
            _params,
            function (err, results) {
                callback(err, queryBuilder.parseResponse(results));
            }
        );
    },
}