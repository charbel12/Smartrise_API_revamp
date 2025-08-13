const VARS = require('../vars.js');
const MOMENT = require('moment');
var mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');

module.exports = {
    carUse: function (data, callback = null) {
        data = alterData(data);
        var async = require('async');

        let car_id = data.car_id ? ` AND car_id = ${data.car_id}`: "";

        var _params = {
            carCalls: function (cb) {

                var _query = `
                    SELECT 
                        group_id,
                        car_id,
                        count(id) as total_count,
                        DATE(date_created) as day_created,
                        HOUR(date_created) as hour_created,
                        date_created
                    FROM 
                        rpt_carcalls 
                    WHERE
                        group_id = ?
                        ${car_id}
                    AND
                        date_created >= ?
                    AND
                        date_created <= ?
                    GROUP BY
                        group_id,
                        car_id,
                        day_created, 
                        hour_created
                `;
                mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
                    //console.log("DBERR::",err);
                    // for(var i=0; i< result.length; i++){
                    //     result[i]['date_created'] = MOMENT(result[i]['date_created']).format("YYYY-MM-DDTHH:mm:ss").toString()+".000Z";
                    // }
                    cb(err, result);
                })
            },
            hallCalls: function (cb) {
                var _query = `
                    SELECT 
                        group_id,
                        count(id) as total_count,
                        DATE(date_created) as day_created,
                        HOUR(date_created) as hour_created,
                        date_created
                    FROM 
                        rpt_hallcalls 
                    WHERE
                        group_id = ?
                    AND
                        date_created >= ?
                    AND
                        date_created <= ?
                    GROUP BY
                        group_id,
                        hour_created
                    ORDER BY
                        floor_id desc
                `;
                mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
                    //console.log("DBERR::",err);
                    cb(err, result);
                })
            },
        };

        async.parallel(
            _params,
            function (err, results) {
                callback(err, results);
            }
        );

    },
    faultSummary: function (data, callback = null) {
        data = alterData(data);
        var _query = `
            SELECT
                count(ef.id) as total_count,
                ef.elevator_id,
                ef.elevator_group_id,
                sf.*
            FROM
                elevator_faults ef 
            LEFT JOIN 
                system_faults sf 
            ON 
                ef.fault_id = sf.number
            WHERE
                ef.date_created >= "${data.date_from}" 
            AND 
                ef.date_created <= "${data.date_to}" 
            AND 
                ef.elevator_group_id="${data.group_id}" 
            GROUP BY
                sf.category,
                ef.elevator_id,
                ef.elevator_group_id
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })

    },
    faultHistory: function (data, callback = null) {
        data = alterData(data);
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sSelectSql: "*",
            sFromSql: `(
                SELECT
                    ef.elevator_id,
                    ef.elevator_group_id,
                    ef.date_created AS fault_date,
                    DATE_FORMAT(ef.date_created, '%Y-%m-%d %H:%i:%S') AS new_date,
                    ef.fault_speed,
                    ef.fault_position,
                    ef.car_speed,
                    ef.car_position,
                    ef.floor_pi  AS floor_pi,
                    sf.*
                FROM
                    rpt_faults ef
                LEFT JOIN
                    system_faults sf
                ON
                    ef.fault_id = sf.number
                WHERE
                    ef.date_created BETWEEN "${data.date_from}" AND "${data.date_to}"
                AND
                    ef.elevator_group_id="${data.group_id}"
                ${data.car_id ? ' AND ef.elevator_id="' + data.car_id + '"' : ""}
                ${data.floor_pi ? ' AND ef.floor_index=' + data.floor_pi + '' : ""}
                group by 
                    ef.elevator_id, 
                    ef.fault_id, 
                    ef.date_created
                    
            ) as sqlQuery`,
            aSearchColumns: ['number', 'name', 'definition', 'solution', 'tag']
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
    alarmHistory: function (data, callback = null) {
        data = alterData(data);
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sSelectSql: "*",
            sFromSql: `(
                SELECT
                    ea.elevator_id,
                    ea.elevator_group_id,
                    ea.date_created AS alarm_date,
                    DATE_FORMAT(ea.date_created, '%Y-%m-%d %H:%i:%S') AS new_date,
                    ea.alarm_speed,
                    ea.alarm_position,
                    ea.car_speed,
                    ea.car_position,
                    ea.floor_pi AS floor_pi,
                    sa.*
                FROM
                    rpt_alarms ea
                LEFT JOIN
                    system_alarms sa
                ON
                    ea.alarm_id = sa.number
                WHERE
                    ea.date_created >= "${data.date_from}"
                AND 
                    ea.date_created <= "${data.date_to}"
                AND 
                    ea.elevator_group_id="${data.group_id}"
                ${data.car_id ? ' AND ea.elevator_id="' + data.car_id + '"' : ""}
                ${data.floor_pi ? ' AND ea.floor_index=' + data.floor_pi + '' : ""}
                group by
                    ea.date_created,
                    ea.alarm_id
            ) as sqlQuery`,
            aSearchColumns: ['number', 'name', 'definition', 'solution', 'tag']
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
        // console.log(queries.select)
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
    faultsDefinition: function (data, callback = null) {
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sTableName: 'system_faults'
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
    alarmsDefinition: function (data, callback = null) {
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            sTableName: 'system_alarms'
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
    carCallsFloor: function (data, callback = null) {

        data = alterData(data);
        console.log("data",data)
        var _query = `
        SELECT 
        group_id,
        car_id,
        floor_id,
        COUNT(id) AS total_count,
        DATE(date_created) AS day_created
    FROM 
        rpt_carcalls 
    WHERE
        group_id = ?
        AND date_created BETWEEN ? AND ?
    GROUP BY
        group_id,
        car_id,
        floor_id,
        DATE(date_created)
    ORDER BY
        floor_id DESC;
    
        `;
        
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            console.log("DBERR::",err);
            console.log('result',result)
            callback(err, result);
        })
    },
    carCallsTime: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                group_id,
                car_id,
                count(id) as total_count,
                DATE(date_created) as day_created,
                HOUR(date_created) as hour_created
            FROM 
                rpt_carcalls 
            WHERE
                group_id = ?
            AND
                date_created BETWEEN ? AND ?
            GROUP BY
                group_id,
                car_id,
                day_created, 
                hour_created
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            console.log("DBERR::",err);
            callback(err, result);
        })
    },
    hallCallsFloor: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                group_id,
                floor_id,
                direction,
                count(id) as total_count,
                DATE(date_created) as day_created
            FROM 
                rpt_hallcalls 
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,floor_id,direction
            ORDER BY
                floor_id desc
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })
    },
    hallCallsTime: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                group_id,
                direction,
                count(id) as total_count,
                date_created,
                DATE(date_created) as day_created,
                HOUR(date_created) as hour_created
            FROM 
                rpt_hallcalls 
            WHERE
                group_id = ?
            AND
                date_created BETWEEN ? AND ?
            GROUP BY
                group_id,
                direction,
                hour_created
            ORDER BY
                floor_id desc
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })
    },
    doorTimes: function (data, callback = null) {
        data = alterData(data);

        if(typeof data.floor_id === "undefined"){
            data.floor = "null is null";
        }
        
        var _query = `
            SELECT 
                * ,
                ROUND(AVG(time_sec),1) as average
            FROM 
                rpt_doors 
            WHERE
                group_id = ?
            AND
                floor_id = ${typeof data.floor === "undefined" ? 'null is null' : data.floor}
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                car_id,
                door_state
        `;
        
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            callback(err, result);
        })
    },
    outOfService: function (data, callback = null) {
        data = alterData(data);
        var async = require('async'),
            QueryBuilder = require('datatable');
        var date = data.date_from ? `AND date_created BETWEEN '${data.date_from}' AND '${data.date_to}'` : "";
        var cID = data.car_id ? `AND car_id = ${data.car_id}` : "";
        var tableDefinition = {
            sSelectSql: "*",
            sFromSql: `(
                
                SELECT 
                    rpt_services.*,
                    CONCAT(ref_class.name,
                            ' / ',
                            ref_class_category.name) AS mode_of,
                    TIMESTAMPDIFF(SECOND,
                        date_created,
                        date_next) AS DURATION
                FROM
                    rpt_services,
                    ref_class_category,
                    ref_class
                WHERE
                    rpt_services.mode_of_operation = ref_class_category.ref_cat_id
                        AND rpt_services.class_of_operation = ref_class_category.ref_class_id
                        AND ref_class.class_id = ref_class_category.ref_class_id
                        AND CONCAT(mode_of_operation, class_of_operation) != '23'
                        AND group_id = ${data.group_id}
                        ${date}
                        ${cID}
                        group by mode_of
                    
                ) as sqQ`,
            aSearchColumns: ['car_id', 'mode_of']
            //sTableName: 'rpt_services',
            //sWhereAndSql: `(class_of_operation != 3 and mode_of_operation != 2) and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id} ${_cID}`,
            //aSearchColumns: ['car_id','mode_of_operation']
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
                var res = queryBuilder.parseResponse(results)
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                    duration = element.DURATION
                    days = parseInt(duration / (60*60*24))
                    duration = duration - (days * (60*60*24) )
                    hours = parseInt(duration/(60*60))
                    duration = duration - ( hours * (60*60) )
                    minutes = parseInt(duration / 60 )
                    res.data[index].DURATION = days + "d " + hours + "h " + minutes + "m"
                }
                callback(err, res);
            }
        );

    },

    inServiceOverview: function (data, callback = null) {
        let dateInput;
    
        if (data.date && MOMENT(data.date, 'MM/DD/YYYY', true).isValid()) {
            dateInput = MOMENT(data.date, 'MM/DD/YYYY').format('YYYY-MM-DD');
        } else {
            dateInput = MOMENT().format('YYYY-MM-DD');
        }
    
        let carsIn = '';
        let params = [data.group_id];
    
        if (data.car_ids && data.car_ids.length > 0) {
            carsIn = 'AND car_id IN (?)';
            params.push(data.car_ids);
        }
    
        params.push(dateInput);
    
        const query = `
            SELECT 
                group_id,
                car_id,
                floor_id,
                mode_of_operation,
                class_of_operation,
                date_created,
                date_next,
                date_created AS max_date,
                date_created AS min_date,
                DATE(date_created) as day_created
            FROM
                rpt_services
            WHERE 
                group_id = ?
            AND
                class_of_operation <> -2
            AND
                class_of_operation <> 0
            AND
                DATE(date_created) >= ?
            ${carsIn}
            GROUP BY 
                DATE(date_created),
                group_id,
                car_id,
                floor_id,
                mode_of_operation,
                class_of_operation
            ORDER BY
                car_id ASC,
                date_created ASC`;
    
        mysql.pool(query, params, function (err, result) {
            if (err) {
                console.error(err);
                return callback(err, null);
            }
    
            callback(null, result);
        });
    },
    waitTimeAveTimeDay: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                * ,
                HOUR(date_created) as hour_created,
                ROUND(AVG(wait_time),1) as average
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                hour_created,
                direction
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })
    },
    waitTimeAveTimeFloor: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                * ,
                HOUR(date_created) as hour_created,
                ROUND(AVG(wait_time),1) as average
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                floor_id,
                direction
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })
    },
    waitTime: function (data, callback = null) {
        data = alterData(data);

        var _query = `
            SELECT 
                * ,
                HOUR(date_created) as hour_created
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
        `;
        mysql.pool(_query, [data.group_id, data.date_from, data.date_to], function (err, result) {
            //console.log("DBERR::",err);
            callback(err, result);
        })
    },
    waitTimesLongest: function (data, callback) {
        data = alterData(data);
        var async = require('async'),
            QueryBuilder = require('datatable');

        var tableDefinition = {
            //sTableName: 'rpt_wait',
            sSelectSql: "*",
            sFromSql: `
                (SELECT 
                    id, 
                    group_id, 
                    floor_id, 
                    CONCAT('Floor', ' ',floor_id) as floor_name, 
                    direction, 
                    date_created, 
                    wait_time
                FROM
                    rpt_wait
                WHERE
                    wait_time >= 50 
                AND 
                    date_created >= '${data.date_from}' 
                AND
                    date_created <= '${data.date_to}' 
                AND 
                    group_id= ${data.group_id}
            )as sqQ
            `,
            //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
            aSearchColumns: ['floor_name', 'direction', 'wait_time', 'date_created']
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
        // console.log(queries.select)
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

    waitTimesDistributionUp: function (data, callback = null) {
        data = alterData(data);
        const date = data.date_from ? `AND date_created between '${data.date_from}' and '${data.date_to}' ` : "";

        var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            direction = 'up'
        AND 
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
        mysql.pool(_query, [], function (err, result) {
            callback(err, result);
        })
    },

    waitTimesDistributionDown: function (data, callback = null) {
        data = alterData(data);
        const date = data.date_from ? `AND date_created between'${data.date_from}' and '${data.date_to}' ` : "";
        var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            direction = 'down'
        AND 
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
        mysql.pool(_query, [], function (err, result) {
            callback(err, result);
        })
    },
    waitTimesDistributionWaitTime: function (data, callback = null) {
        data = alterData(data);
        const date = data.date_from ? `AND date_created between'${data.date_from}' and '${data.date_to}'` : "";
        var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
        mysql.pool(_query, [], function (err, result) {
            callback(err, result);
        })
    },

    floorToFloor: function (data, callback = null) {
        data = alterData(data);
        var async = require('async')

        var _params = {
            fromFloor: function (cb) {
                var _query = `  
                    SELECT 
                        * ,
                        ROUND(AVG(wait_time), 1) as average
                    FROM 
                        rpt_floortfloor
                    WHERE
                        group_id = '${data.group_id}'
                    AND
                        floor_from = '${data.floor_id}'
                    AND
                        date_created >= '${data.date_from}'
                    AND
                        date_created <= '${data.date_to}'
                    GROUP BY
                        group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction
                `;
                mysql.pool(_query, [data.group_id, data.floor_id, data.date_from, data.date_to], function (err, result) {

                    cb(err, result);
                })
            },
            toFloor: function (cb) {
                var _query = `  
                    SELECT 
                        * ,
                        ROUND(AVG(wait_time),1) as average
                    FROM 
                        rpt_floortfloor
                    WHERE
                    group_id = '${data.group_id}'
                    AND
                        floor_to = '${data.floor_id}'
                    AND
                        date_created >= '${data.date_from}'
                    AND
                        date_created <= '${data.date_to}'
                    GROUP BY
                        group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction
                `;
                mysql.pool(_query, [data.group_id, data.floor_id, data.date_from, data.date_to], function (err, result) {
                    //console.log("DBERR::",err);
                    cb(err, result);
                })
            },
        };

        async.parallel(
            _params,
            function (err, results) {
                // console.log(results)
                callback(err, results);
            }
        );

    },
    programEvents: function (data, callback = null) {

        data = alterData(data);
        
        var async = require('async'),
            QueryBuilder = require('datatable');
        
        const type = data.type ? `AND type = '${data.type}'` : "";

        var tableDefinition = {
            sSelectSql: "*",
            sFromSql: `
                (SELECT CONCAT(rpt_program_events.type,": ",rpt_program_events.description) as data,
                date_created,
                DATE_FORMAT(date_created, "%Y-%m-%d %H:%i:%s") AS new_date_created
            FROM
                rpt_program_events
            WHERE
                date_created between  '${data.date_from}' and '${data.date_to}'
                ${type}
                            )as sqQ
            `,
            //sWhereAndSql: `wait_time >= 50 and date_created >= '${data.date_from}' and date_created <= '${data.date_to}' and group_id= ${data.group_id}`,
            aSearchColumns: ['data','new_date_created', 'date_created']
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


function alterData(data) {
    try{
       
        if (!data.date_from) {
            data.date_from = MOMENT.utc(MOMENT("1990-01-01 00:00:00").format()).format();
        }
        else {
            if(data.start_time && data.end_time){
                data.date_from = MOMENT(MOMENT(data.date_from +" "+ data.start_time, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
            }else{
                // data.date_from = data.date_from = MOMENT(data.date_from + " " + MOMENT().format("HH:mm:ss"), ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).utc().format("YYYY-MM-DD");
                data.date_from = MOMENT(MOMENT(data.date_from + " 00:00:00", ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
            }
            
        }
        if (!data.date_to) {
            data.date_to = MOMENT.utc(MOMENT().format()).format();
        }
        else {
            if(data.start_time && data.end_time){
                data.date_to = MOMENT(MOMENT(data.date_to +" "+ data.end_time, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
            }else{
                //  data.date_to = data.date_to = MOMENT(data.date_to + " " + MOMENT().format("HH:mm:ss"), ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).utc().format("YYYY-MM-DD");
                data.date_to = MOMENT(MOMENT(data.date_to + " 23:59:59", ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
            }
        }
        return data;
    }catch(err){
        console.log(err);
    }
}