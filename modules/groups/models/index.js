const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE_NAME = VARS.table_name;
const TOOLS = require('../../../helpers/tools.js');

const fs = require('fs');

const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];

const GroupFiles = require('../../settings/models/group-config.js');

// const PI = [
//   process.env.PI_0,
//   process.env.PI_1,
//   process.env.PI_2,
//   process.env.PI_3,
// ];

module.exports = {
	datatables: function(groupID,carID,data, callback = null){
		var async = require('async'),
		    QueryBuilder = require('datatable');
		 
		var tableDefinition = {
			sSelectSql: `*`,
		    sFromSql: `(SELECT * FROM elevator_faults ef left join elevators e on ef.elevator_id = e.id left join system_faults sf on ef.fault_id=sf.id where ef.elevator_id = ${carID}) as sqlQuery`
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
	getAll: function(callback = null){
		/*mysql.query(`select * from ${TABLE_NAME} where status=1`,[],function(err,result){
			callback(err,result);
		})*/
		var _result = [];
		
		PI.forEach(function(p,i){
			if(p){
				try{

				_result.push({
					'data: ': p
				});
					
				} catch(e) {

					_result.push({
						id: p['GroupID'],
						name: p['JobName']
					});
				}
			}
		});
		callback(null,_result);
	},
	getAllCars: function(groupID, callback = null){
		var GroupFiles = require('../../settings/models/group-config.js');
		var _result = [];
		
		GroupFiles.getGroupConfigFiles(function(err,files){
			files.forEach(function(val){
				var _f = val.content;
				if(_f.GroupID == groupID){
					_f.Cars.forEach(function(v){
						v['id'] = v['Id'];
						v['name'] = 'Car ' + v['id'];
						_result.push(v);
					})
				}
			})
			callback(null,_result);
		});
	},
	getCarLabels: function(groupID, callback = null){
		GroupFiles.getCarLabelsFromConfigs(function(err,files){
			callback(null,files);
		});
	},
	getAllPiLabels: function(groupID, callback = null) {
		var pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
		pi_json.forEach(pi => {
			if (pi.GroupID == groupID) {
				var pi_ip = pi.location.split(':')[0];
				axios.get(`http://`+ pi_ip + `/ajax/get_pi_labels/`, {timeout: 2000}).then((response) => {
					var jsonObj = response.data;
					_result = jsonObj;
					callback(null,_result);
				}).catch((err) => {
					if (err.response) {
						if (err.response.status == 500) {
							_result = {"Status":500, "Message":"DAD unit in not configured"};
							callback(null,_result);
						}
					} else {
						_result = {"Status":405, "Message":"RPI is not connected"};
						callback(null,_result);
					}
				})
			}
		})
		
	},
	delete: function(groupID,carID,callback = null){
		mysql.pool(`delete from ${TABLE_NAME} where elevator_id=?`,[carID],function(err,result){
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
	}

}