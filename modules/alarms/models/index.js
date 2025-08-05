const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE_NAME = VARS.table_name;
const TABLE_SUB_NAME = VARS.table_sub_name;
const TOOLS = require('../../../helpers/tools.js');

module.exports = {
    datatables: function (groupID, carID, data, callback = null) {
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sSelectSql: `*`,
            sFromSql: `(
                SELECT 
                    ea.id as eaid, 
                    ea.alarm_id as number, 
                    ea.name, 
                    ea.description as definition, 
                    ea.solution, 
                    ea.elevator_id as carid,
                    ea.floor_pi AS floor,
                    ea.car_speed,
                    CAST(ea.car_position AS UNSIGNED) AS car_position,
                    ea.alarm_speed,
                    CAST(ea.alarm_position AS UNSIGNED) AS alarm_position,
                    ea.date_created,
                    DATE_FORMAT(ea.date_created, '%Y-%m-%d %H:%i:%S') AS new_date
                FROM 
                    elevator_alarms ea 
                where 
                    ea.elevator_id = ${carID}
                AND
                    ea.elevator_group_id = '${groupID}'
                AND 
                    status = 1
                ) as sqlQuery`,
            aSearchColumns: ['number', 'name', 'definition', 'solution']
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
    delete: function (groupID, carID, callback = null) {
        mysql.pool(`delete from ${TABLE_NAME} where elevator_id=?`, [carID], function (err, result) {
            callback(err, result);
        })
    },
    clearAll: function (groupId, callback = null) {
        mysql.pool(`DELETE FROM  ${TABLE_NAME} WHERE elevator_group_id=?`, [groupId], function (err, result) {
            callback(err, result);
        })
    },
    import: function (data, callback = null) {
        mysql.pool("", [], function (err, result) {
            callback(err, result);
        })
    },
    export: function (data, callback = null) {
        mysql.pool("", [], function (err, result) {
            callback(err, result);
        })
    },
    get: function (id, callback = null) {
        mysql.pool(`SELECT * from system_alarms where number=?`, [id], function (err, result) {
            callback(err, result);
        })
    },
    getCarAlarm: function (id, data=null, callback = null) {
        mysql.pool(`SELECT ea.elevator_id as carid, ea.date_created AS date_created, DATE_FORMAT(ea.date_created, '%Y-%m-%d %H:%i:%S') AS new_date, ea.floor_pi, ea.car_speed, ea.alarm_speed, ea.alarm_position, sa.* from ${TABLE_NAME} ea left join system_alarms sa on ea.alarm_id=sa.number where ea.id=?`, [id], function (err, result) {
            callback(err, result);
        })
    },

    all: function (data, callback = null) {
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sTableName: 'system_alarms',
            aSearchColumns: ['number', 'name']
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
    }

}