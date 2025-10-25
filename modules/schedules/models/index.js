const { tableName } = require('../vars.js');
const mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');
const async = require('async');
const moment = require('moment')
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const QueryBuilder = require('datatable');

module.exports = {
	datatables: async function(data, callback = null){
		
		const { start_date , end_date, } = data
		let { start_time, end_time, } = data
		let dateRange = ""
		let timeRange = ""
		let defaultStartTime = '00:00:00'
		let defaultEndTime = '23:59:59'
		let filterByTime = true

		if (start_date != "" && end_date != "") {
			start_time = start_time ? start_time : defaultStartTime
			end_time = end_time ? end_time : defaultEndTime
            const df = await TOOLS.dateTimeUTC(start_date + " " + start_time, "YYYY-MM-DD HH:mm:ss")
            const dt = await TOOLS.dateTimeUTC(end_date + " " + end_time, "YYYY-MM-DD HH:mm:ss")
			dateRange = "(concat(start_date,' ',start_time) >= '" + df + "' and concat(end_date,' ',end_time) <= '"+ dt + "') "
			filterByTime = false
		}
		
		if (filterByTime) {
			if (start_time != "" && end_time != "") {
				const tf = await TOOLS.timeUTC(start_time, "HH:mm:ss")
				const tt = await TOOLS.timeUTC(end_time, "HH:mm:ss")
				timeRange = "(start_time >= '" + tf + "' and end_time <= '"+ tt + "') "
			}
		}
		
		const tableDefinition = {
			sFromSql:`(select *
				from
				schedules 
				${dateRange ? `where ${dateRange}`: ''}
				${timeRange ? `where ${timeRange}`: ''}) as sqlQuery`,
		};
 
		const queryBuilder = new QueryBuilder(tableDefinition);
		// requestQuery is normally provided by the DataTables AJAX call
		const requestQuery = {
            start: 0,
            length: 10,
            search: {
                value:"",
                regex: false
            }
        };

        const opts = TOOLS.extendDefaults(requestQuery, data);
		// Build an object of SQL statements
		const queries = queryBuilder.buildQuery(opts);
		// Connect to the database
		const _params = {
            recordsTotal: function(cb) {
                mysql.pool(queries.recordsTotal,[], function(error, results) {
                	cb(error, results);
                })
            },
            select: function(cb) {
                mysql.pool(queries.select,[], function(error, results) {
                    cb(error, results)
                })
            },
        }
        if (opts.search.value != "") {
            _params["recordsFiltered"] = function(cb) {
                mysql.pool(queries.select,[], function(error, results) {
                    cb(error, results);
                });
            }
        }
		async.parallel(
            _params,
            function(err, results) {
            	callback(err,queryBuilder.parseResponse(results));
            }
        )
	},
	datatablesV2: async function(data, callback = null){
		
		let tableDefinition = {
			sFromSql:`(select *
				from
				schedules) as sqlQuery`,
		};

		if((typeof data.filterData !== "undefined")){
			
			let filter = data.filterData;

			if(filter.controls || filter.how_often || filter.status || filter.time){
				let controls = (typeof filter.controls !== "undefined" && filter.controls) ? "\""+filter.controls.toString()+"\"" : 'IFNULL(NULL, sqlQuery.controls)';
				let how_often = (typeof filter.how_often !== "undefined" && filter.how_often) ? "\""+filter.how_often.toString()+"\"" : 'IFNULL(NULL, sqlQuery.day_type)';
				let status  = (typeof filter.status !== "undefined" && filter.status) ? "\""+filter.status.toString()+"\"" : 'IFNULL(NULL, sqlQuery.status)';
				let start_time;
				let end_time;
				let timeRange;
				if(typeof filter.time !== "undefined"){

					const time = filter.time.split("-");

					start_time = (typeof filter.time !== "undefined" && filter.time) ? "\""+time[0].toString()+"\"" : '';
					end_time = (typeof filter.time !== "undefined" && filter.time) ? "\""+time[1].toString()+"\"" : '';;
					
					if(start_time && end_time){
						timeRange = ` AND start_time >= ${start_time} AND end_time <= ${end_time}`;
					}

				}
				if(start_time && end_time){
					tableDefinition.sWhereAndSql = `sqlQuery.controls IN (${controls}) AND sqlQuery.day_type IN (${how_often}) AND sqlQuery.status IN (${status}) ${timeRange}`; 
				}else{
					tableDefinition.sWhereAndSql = `sqlQuery.controls IN (${controls}) AND sqlQuery.day_type IN (${how_often}) AND sqlQuery.status IN (${status})`; 
				}
			}
		}

 
		const queryBuilder = new QueryBuilder(tableDefinition);
		
		const requestQuery = {
            start: 0,
            length: 10,
            search: {
                value:"",
                regex: false
            }
        };

        const opts = TOOLS.extendDefaults(requestQuery, data);
		// Build an object of SQL statements
		const queries = queryBuilder.buildQuery(opts);
		// Connect to the database
		const _params = {
            recordsTotal: function(cb) {
                mysql.pool(queries.recordsTotal,[], function(error, results) {
                	cb(error, results);
                })
            },
            select: function(cb) {
                mysql.pool(queries.select,[], function(error, results) {
                    cb(error, results)
                })
            },
        }
        if (opts.search.value != "") {
            _params["recordsFiltered"] = function(cb) {
                mysql.pool(queries.select,[], function(error, results) {
                    cb(error, results);
                });
            }
        }
		async.parallel(
            _params,
            function(err, results) {
            	callback(err,queryBuilder.parseResponse(results));
            }
        )
	},
	get: function(id, callback = null){
		const COLUMNS = [
			'id',
			'name',
			'start_date',
			'start_time',
			'end_date',
			'end_time',
			'status',
			'description',
			'day_type',
			'day_value',
			'secure_all',
			'group_id'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where id=?`,[id],function(err,result){
			callback(err,result);
		})
	},
	getV2: function(id, callback = null){
		const COLUMNS = [
			'id',
			'name',
			'start_date',
			'start_time',
			'end_date',
			'end_time',
			'status',
			'description',
			'day_type',
			'day_value',
			'ending_day',
			'controls',
			'secure_all',
			'group_id'
		]
		mysql.pool(`SELECT ${COLUMNS.join(",")} FROM ${tableName} WHERE id=?`,[id],function(err,result){
			callback(err,result);
		})
	},
	create: function(data, callback = null){
		let _data = data.data
		/*var MOMENT = require('moment');
		var _startDate = MOMENT.utc(MOMENT(_data.start_date + " " + _data.start_time).format()).format();
		var _endDate = MOMENT.utc(MOMENT(_data.end_date + " " + _data.end_time).format()).format();

		
		_data.start_date = MOMENT.utc(_startDate).format('YYYY-MM-DD');
		_data.start_time = MOMENT.utc(_startDate).format('HH:mm');

		_data.end_date = MOMENT.utc(_endDate).format('YYYY-MM-DD');
		_data.end_time = MOMENT.utc(_endDate).format('HH:mm');*/
		mysql.pool(`insert into ${tableName} set ?,createdAt=utc_timestamp(),updatedAt=utc_timestamp()`,[_data],function(err,result){
			callback(err,result);
		})
	},
	createV2: function(data, callback = null){
		const params = data.data;
		
		mysql.pool(`INSERT INTO ${tableName} SET ?,createdAt=utc_timestamp()`,[params],function(err,result){
			callback(err,result);
		});
	},
	update: function(id,data,callback = null){
		let _data = data.data
		/*var MOMENT = require('moment');
		var _startDate = MOMENT.utc(MOMENT(_data.start_date + " " + _data.start_time).format()).format();
		var _endDate = MOMENT.utc(MOMENT(_data.end_date + " " + _data.end_time).format()).format();

		
		_data.start_date = MOMENT.utc(_startDate).format('YYYY-MM-DD');
		_data.start_time = MOMENT.utc(_startDate).format('HH:mm');

		_data.end_date = MOMENT.utc(_endDate).format('YYYY-MM-DD');
		_data.end_time = MOMENT.utc(_endDate).format('HH:mm');*/
		mysql.pool(`update ${tableName} set ?,updatedAt=utc_timestamp() where id=?`,[_data,id],function(err,result){
			callback(err,result);
		})
	},
	updateV2: function(id,data,callback = null){
		data.data = {...data.data, start_date: null};
		const param = data.data
		mysql.pool(`UPDATE ${tableName} SET ?,updatedAt=utc_timestamp() WHERE id=?`,[param,id],function(err,result){
			callback(err,result);
		})
	},
	delete: function(id,callback = null){
		mysql.pool(`delete from ${tableName} where id=?`,[id],function(err,result){
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
	getAll: function(callback=null){
		mysql.pool(`select * from ${tableName}`,[],function(err,result){
			callback(err,result);
		})
	},
	getOneTime: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id',
			'controls',
			'ending_day'
		]
		mysql.pool(`SELECT ${COLUMNS.join(",")} FROM ${tableName} WHERE day_type=? AND status=?`,['one_time_only', 1],function(err,result){
			callback(err,result);
		})
	},
	getYearly: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['yearly', 1],function(err,result){
			callback(err,result);
		})
	},
	getOnceAYear: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id',
			'controls',
			'ending_day'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['once_a_year', 1],function(err,result){
			callback(err,result);
		})
	},
	getDaysOfWeekInMonth: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id',
			'controls',
			'ending_day'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['day_of_week_in_month', 1],function(err,result){
			callback(err,result);
		})
	},
	getDaysofWeek: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id',
			'controls',
			'ending_day'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['daily', 1],function(err,result){
			callback(err,result);
		})
	},
	getSameDateEachYear: function( callback = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id',
			'controls',
			'ending_day'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['same_date_each_year', 1],function(err,result){
			callback(err,result);
		})
	},
	getOccurence: function( callback  = null ) {
		const COLUMNS = [
			'id',
			'day_type',
			'day_value',
			'start_time',
			'end_time',
			'status',
			'start_date',
			'end_date',
			'secure_all',
			'group_id'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${tableName} where day_type=? and status=? `,['occurence', 1],function(err,result){
			callback(err,result);
		})
	},
	reduceOccurence: function(schedule, callback = null) {
		const dayValueObject = JSON.parse(schedule.day_value)
		dayValueObject.occurence = parseInt(dayValueObject.occurence) - 1
		const data  = {
			data : {
				day_value: JSON.stringify(dayValueObject)
			}
		}
		this.pool(schedule.id, data, function(err, result) {
			callback(err,result);
		})
	},
	getSchedules: function(callback=null){
		mysql.pool(`SELECT * FROM ${tableName} s INNER JOIN car_security cs ON (cs.schedule_id = s.id) WHERE s.status = ?`, [1], function(err, result){
			callback(err, result);
		});
	},
	validate: function(param, callback=null){

		const key = param.key;
		const value = param.value;
		let results = [];

		let ret = {};

		let editQuery = "";

		if(typeof param.schedule_id !== "undefined"){
			editQuery = `AND id <> ${param.schedule_id}`;
		}

		mysql.pool(`SELECT COUNT(id) AS count, start_time FROM ${tableName} WHERE ${key} = ? ${editQuery}`, [value], async function(err, result){
			
			if(result[0].count && key === "start_time"){

				var dayValue = JSON.stringify(await module.exports.getDayValues(value));

				for(let day of JSON.parse(dayValue)){

					let data = day.day_value;
					let newData = JSON.parse(data);
					if(Object.keys(newData).length >= 2){
						let date = TOOLS.getDayValue(newData.value);

						if(Array.isArray(date) && Array.isArray(param.date) && param.date.length > 0){
							if(Array.isArray(param.date)){
								for (let d of param.date){
									if(date.includes(d.toLocaleString())){
										if(day.start_time === value){
											if(typeof param.schedule_id !== "undefined"){
												if(param.schedule_id !== day.id){
													ret = {...ret, return: true, data: [{count: result[0].count, day: d}]}
													//break;
													callback("", [{count:result[0].count, day: d}]);
													return;
												}
											}
										}else{
											ret = {...ret, return: true, data: [{count: 0, day: d}]}
											break;
										}
									}
									
									if(!Object.keys(ret).length){
										callback("", [{count: 0}]);
										return;
									}
								}
							}
						}else{
							if(!Array.isArray(date) && MOMENT(date, "Y-M-D").isValid()){
								if(!Array.isArray(param.date) && date === param.date && value === day.start_time){
									if(typeof param.schedule_id !== "undefined"){
										if(param.schedule_id !== day.id){
											results = [...results, date];
										}
									}else{
										results = [...results, date];
									}
								}else{
									ret = {}
									ret = {...ret, return: true, data: [{count: 0, date: date}]};
								}
							}
						}
					}
				}

				if(typeof param.date !== "undefined" && Array.isArray(param.date)){
					if(Object.keys(ret).length > 0 && ret.return){
						callback("", ret.data);
						return;
					}
				}else{
					param.date = param.date = MOMENT(param.date, "YYYY-MM-DD").format("Y-M-D");
					if(results.includes(param.date)){
						callback(err, [{count: 1, date: param.date}]);
						return;
					}else{
						callback(err, [{count: 0, date: param.date}]);
						return;
					}
				}

			}else{
				callback(err, result)
				return;
			}
		});
	},
	getDayValues: async (start_time) =>{
		return new Promise((resolve, reject) =>{
			mysql.pool(`SELECT id, day_value, start_time FROM ${tableName} WHERE start_time = ?`, [start_time], function(err, result){
				if(result){
					resolve(result);
                }else{
                    reject(err);
                }
			});
		})
	},
	updateStartDate: async (start_date, id) =>{
		return new Promise((resolve, reject) =>{
			mysql.pool(`UPDATE ${tableName} SET start_date = ? WHERE id = ?`, [start_date, id], function(err, result){
				if(result){
					resolve(result);
                }else{
                    reject(err);
                }
			});
		})
	} 
}