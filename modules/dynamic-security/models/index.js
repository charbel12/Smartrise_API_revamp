const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js')
const TABLE_NAME = VARS.table_name;
const TABLE_SUB_NAME = VARS.table_sub_name;
const TOOLS = require('../../../helpers/tools.js');

module.exports = {
	getHallSecurity: function(groupID,callback = null){
		mysql.pool(`SELECT * FROM hall_security`,[carID],function(err,result){
			callback(err,result);
		})
	},
	getCarSecurity: function(groupID,callback = null){
		var _query = `SELECT 
							cs.*,
							el.floor_name 
						FROM 
							elevator_floors el
						LEFT JOIN
							car_security cs
						ON 
							el.id=cs.floor_id
						WHERE cs.group_id=${groupID}
						ORDER BY 
							el.ordinal 
						ASC`;

		mysql.pool(_query,[carID],function(err,result){
			callback(err,result);
		})
	},
	updateCarSecurity: function(data,callback = null){
		var _door = (data.door == 'front' ? 'front_permission' : 'rear_permission');
		var _security = (data.security == 'access' ? 'access' : 'secure');
		var _query = `UPDATE 
							car_security 
						SET
							?=?
						WHERE
							elevator_id=?
						AND
							group_id=?
						AND
							floor_id=?`;

		mysql.pool(_query,[_door,_security,data.carID,data.groupID,data.floorID],function(err,result){
			callback(err,result);
		})
	},
	delete: function(data, callback = null){
		if(typeof data.controls !== "undefined" && data.controls === "hall-calls"){
			mysql.pool(`DELETE FROM hall_security WHERE schedule_id=? AND elevator_id=? AND floor_id=? AND group_id=?`,[ data.schedule_id, data.elevator_id, data.floor_id, data.group_id	],function(err,result){
				callback(err,result);
			})
		}else{
			mysql.pool(`delete from ${TABLE_NAME} where schedule_id=? and elevator_id=? and floor_id=? and group_id=?`,[ data.schedule_id, data.elevator_id, data.floor_id, data.group_id	],function(err,result){
				callback(err,result);
			})
		}
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
	create: function(data, callback = null){
		let _data = data
		this.delete(_data,function(err,result){ 
			if(typeof _data.controls !== "undefined" && _data.controls === "hall-calls"){
				delete _data.controls;
				mysql.pool(`INSERT INTO hall_security SET ?,date_created=utc_timestamp(),date_modified=utc_timestamp()`,[_data],function(err,result){
					callback(err,result);
				})
			}else{
				delete _data.controls;
				mysql.pool(`insert into ${TABLE_NAME} set ?,date_created=utc_timestamp(),date_modified=utc_timestamp()`,[_data],function(err,result){
					callback(err,result);
				})
			}
		})
	},

	getByScheduleId: function(schedule_id, callback = null) {
		const COLUMNS = [
			'id',
			'schedule_id',
			'elevator_id',
			'floor_id',
			'group_id',
			'front_permission',
			'rear_permission'
		]
		mysql.pool(`select ${COLUMNS.join(",")} from ${TABLE_NAME} where schedule_id=?`,[schedule_id],function(err,result){
			callback(err,result);
		})
	},
	getByScheduleIdV2: function(schedule_id, controls, callback = null) {
		const COLUMNS = [
			'id',
			'schedule_id',
			'elevator_id',
			'floor_id',
			'group_id',
			'front_permission',
			'rear_permission'
		];
		if(controls === "hall-calls"){
			COLUMNS.push('direction')
			mysql.pool(`SELECT ${COLUMNS.join(",")} FROM hall_security WHERE schedule_id=?`,[schedule_id],function(err,result){
				callback(err,result);
			});
		}else{
			mysql.pool(`select ${COLUMNS.join(",")} from ${TABLE_NAME} where schedule_id=?`,[schedule_id],function(err,result){
				callback(err,result);
			});
		}
		
	},
	deleteByScheduleId: function(schedule_id, group_id, callback = null) {
		
		mysql.pool(`delete from ${TABLE_NAME} where schedule_id=? AND group_id=?`,[schedule_id, group_id],function(err,result){
			callback(err,result);
		})
	}

}