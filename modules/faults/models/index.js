const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE_NAME = VARS.table_name;
const TABLE_SUB_NAME = VARS.table_sub_name;
const TOOLS = require('../../../helpers/tools.js');
const MOMENT = require('moment');

module.exports = {
	datatables: function(groupID,carID, data, callback = null){
		var async = require('async'),
		    QueryBuilder = require('datatable');
         // CONVERT_TZ(DATE_FORMAT(ef.date_created, "%d/%m/%Y %H:%i:%s %p"), '+00:00', @@session.time_zone) as new_date
		var tableDefinition = {
			sSelectSql: `*`,
		    sFromSql: `(
                SELECT 
                    ef.id as efid, 
                    ef.fault_id as number, 
                    ef.name, 
                    ef.description as definition, 
                    ef.solution, 
                    ef.elevator_id as carid,
                    ef.floor_pi AS floor,
                    ef.car_speed,
                    CAST(ef.car_position AS UNSIGNED) AS car_position, 
                    ef.fault_speed,
                    CAST(ef.fault_position AS UNSIGNED) AS fault_position,
                    ef.date_created,
                    DATE_FORMAT(ef.date_created, '%Y-%m-%d %H:%i:%S') AS new_date
                FROM 
                    elevator_faults ef 
                where 
                    ef.elevator_id = ${carID}
                AND 
                    ef.elevator_group_id = '${groupID}'
                AND
                    ef.status = 1
            
            ) as sqlQuery`,
            aSearchColumns: ['number','name','definition','solution', 'floor', 'new_date']
        };
        
         
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

        const date = data.search.value ? MOMENT(data.search.value, "YYYY-MM-DD", true) : "";
        if(date){
            if(date.isValid()){
                data.search.value = MOMENT(data.search.value).format("YYYY-MM-DD")
            }else{
                const dateAndTime = data.search.value ? MOMENT(data.search.value, "YYYY-MM-DD HH:mm:ss", true) : "";

                if(dateAndTime){
                    if(dateAndTime.isValid()){
                        data.search.value = MOMENT(data.search.value,"YYYY-MM-DD HH:mm:ss").utc().format("YYYY-MM-DD HH:mm:ss")
                    }
                }
            }
        }

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
	delete: function(groupID,carID,callback = null){
		mysql.pool(`delete from ${TABLE_NAME} where elevator_id=?`,[carID],function(err,result){
			callback(err,result);
		})
    },
    clearAll: function(group,callback = null){
		mysql.pool(`DELETE FROM  ${TABLE_NAME} WHERE elevator_group_id=?;`,[group],function(err,result){
			callback(err,result);
		})
	},
	import: function(data,callback = null){
		mysql.pool("",[],function(err,result){
			callback(err,result);
		})
	},
	export: function(data,callback = null){
		mysql.pool("",[],function(err,result){
			callback(err,result);
		})
	},
	get: function(id,callback = null){
        mysql.pool(`SELECT * from system_faults where id=?`,[id],function(err,result){
            callback(err,result);
        })
    },
    getNumber: function(number,callback = null){
        mysql.pool(`SELECT * from system_faults where number=?`,[number],function(err,result){
            callback(err,result);
        })
    },
    getCarFault: function(id, data=null, callback = null){
		mysql.pool(`SELECT ef.elevator_id as carid, ef.date_created AS date_created, DATE_FORMAT(ef.date_created, '%Y-%m-%d %H:%i:%S') AS new_date, ef.floor_pi, ef.car_speed, ef.fault_speed, ef.fault_position, sf.* from ${TABLE_NAME} ef left join system_faults sf on ef.fault_id=sf.number where ef.id=?`,[id],function(err,result){
			callback(err,result);
		})
    },
    getOldestFaults: function(callback = null){
        mysql.pool(`SELECT id, date_modified AS date_modified FROM ${TABLE_NAME} WHERE date_modified IS NOT NULL ORDER BY id DESC LIMIT 1;`, [],(err, result) =>{
            if(result.length){
                result[0].date_modified =  MOMENT(result[0].date_modified).format("MM/DD/YYYY HH:mm:ss");
                result[0].timezone = TOOLS.getServerTimezone();
            }
            callback(err, result.length > 0 ? result[0] : [])
        });
    },
	all: function(data,callback = null){
		var async = require('async'),
		    QueryBuilder = require('datatable');
		 
		var tableDefinition = {
            sTableName: 'system_faults',
            aSearchColumns: ['number','name']
		};
		 
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
}