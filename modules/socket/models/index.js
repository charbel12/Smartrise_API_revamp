var mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');
const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');
const MOMENT = require('moment');

var car_modes = {"0":"offline","1":"offline","2":"offline","3":"offline","4":"offline","5":"offline","6":"offline","7":"offline"}

module.exports = {
	updateAlarmsTable: function(group_id, jsonObj, callback = null) {
		jsonObj.forEach(alarm => {
			var alarm_datetime = new Date(alarm.timestamp).toISOString().replace("T"," ").split(".")[0]
			alarm_datetime = MOMENT(MOMENT(alarm_datetime, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
			var id = group_id + "-" + alarm.which_car + "-"+ alarm.alarm_number+"-"+ alarm_datetime.toString();
			_query2 = `
				INSERT IGNORE
				INTO
					elevator_alarms
					(id,elevator_id,elevator_group_id,alarm_id,alarm_position,alarm_speed,car_speed,car_position,floor_pi,floor_index,name,description,solution,date_created)
				VALUES
					(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
			`;
			mysql.pool(_query2, [id, alarm.which_car, group_id, alarm.alarm_number, alarm.alarm_position, alarm.alarms_command_speed_fpm, alarm.alarms_car_speed_fpm, alarm.alarm_position, alarm.alarm_floor_label,alarm.alarm_floor, alarm.alarm_name, alarm.alarm_description, alarm.alarm_solution, alarm_datetime], function (err, result) {
				if(err) {
					console.log('error in updateAlarmsTable: ',err)
				}
				callback(err, result);
			})
		})
	},

	updateRptAlarmsTable: function(group_id, jsonObj, callback = null) {
		var that = this
		jsonObj.forEach(alarm => {
			var alarm_datetime = new Date(alarm.timestamp).toISOString().replace("T"," ").split(".")[0]
			alarm_datetime = MOMENT(MOMENT(alarm_datetime, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
			var id = group_id + "-" + alarm.which_car + "-"+ alarm.alarm_number+"-"+ alarm_datetime.toString();
			_query2 = `
				INSERT IGNORE
				INTO
					rpt_alarms
					(id,elevator_id,elevator_group_id,alarm_id,alarm_position,alarm_speed,car_speed,car_position,floor_pi,floor_index,name,description,solution,date_created)
				VALUES
					(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
			`;
			mysql.pool(_query2, [id, alarm.which_car, group_id, alarm.alarm_number, alarm.alarm_position, alarm.alarms_command_speed_fpm, alarm.alarms_command_speed_fpm, alarm.alarm_position,alarm.alarm_floor_label, alarm.alarm_floor, alarm.alarm_name, alarm.alarm_description, alarm.alarm_solution, alarm_datetime], function (err, result) {
				if(err) {
					console.log('error in updateRptAlarmsTable: ',err)
				}
				if(result && result.affectedRows > 0){
					that.updateAlarmsTable(group_id,[alarm],function(err,result2){
					})
				}
			})
		});
	},

	updateFaultsTable: function(group_id, jsonObj, callback = null) {
		jsonObj.forEach(fault => {
			var fault_datetime = new Date(fault.timestamp).toISOString().replace("T"," ").split(".")[0]
			fault_datetime = MOMENT(MOMENT(fault_datetime, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
			var id = group_id + "-" + fault.which_car + "-"+ fault.fault_number+"-"+ fault_datetime.toString();
			_query2 = `
				INSERT IGNORE
				INTO
					elevator_faults
					(id,elevator_id,elevator_group_id,fault_id,fault_position,fault_speed,car_speed,car_position,floor_pi,floor_index,name,description,solution,date_created)
				VALUES
					(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
			`;
			mysql.pool(_query2, [id, fault.which_car, group_id, fault.fault_number, fault.fault_position, fault.fault_command_speed_fpm, fault.fault_car_speed_fpm, fault.fault_position,fault.fault_floor_label , fault.fault_floor, fault.fault_name, fault.fault_description, fault.faults_solution, fault_datetime], function (err, result) {
				if(err) {
					console.log('error in updateFaultsTable: ',err)
				}
				callback(err, result);
			})
			sendNotification('faults', fault.fault_number, group_id, fault.which_car, fault.fault_position, fault.fault_car_speed_fpm, fault.fault_floor_label);
		})
	},

	updateRptFaultsTable: function(group_id, jsonObj, callback = null) {
		var that = this
		jsonObj.forEach(fault => {
			var fault_datetime = new Date(fault.timestamp).toISOString().replace("T"," ").split(".")[0]
			fault_datetime = MOMENT(MOMENT(fault_datetime, ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).format("YYYY-MM-DD HH:mm:ss")).utc().format("YYYY-MM-DD HH:mm:ss");
			var id = group_id + "-" + fault.which_car + "-"+ fault.fault_number+"-"+ fault_datetime.toString();
			_query2 = `
				INSERT IGNORE
				INTO
					rpt_faults
					(id,elevator_id,elevator_group_id,fault_id,fault_position,fault_speed,car_speed,car_position,floor_pi,floor_index,name,description,solution,date_created)
				VALUES
					(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
			`;
			mysql.pool(_query2, [id, fault.which_car, group_id, fault.fault_number, fault.fault_position, fault.fault_command_speed_fpm, fault.fault_command_speed_fpm, fault.fault_position, fault.fault_floor_label, fault.fault_floor, fault.fault_name, fault.fault_description, fault.faults_solution, fault_datetime], function (err, result) {
				if(err) {
					console.log('error in updateRptFaultsTable: ',err)
				}
				if(result && result.affectedRows > 0){
					that.updateFaultsTable(group_id,[fault],function(err,result2){
					})
				}
			})
		})
	},

	createDoorsReport: function (group_id, car_id, floor_id, door_state, time_sec, opening) {
		var _query = `
			INSERT
			INTO
				rpt_doors
				(group_id, car_id, floor_id,door_state,time_sec, opening, date_created)
			VALUES
				(?,?,?,?,?,?,UTC_TIMESTAMP())
		`;
		mysql.pool(_query, [group_id, car_id, floor_id, door_state, time_sec, opening], function (err, result) {
		})
	},
	createReportLog: function (group_id, messageType, message) {
		var _query = `
			INSERT
			INTO
				reports
				(group_id,messagetype,message,date_created)
			VALUES
				(?,?,?,UTC_TIMESTAMP())
		`;
		mysql.pool(_query, [group_id, messageType, message], function (err, result) {
			//console.log(err)
			//callback(err,result);
		})
	},
	createFault: function (elevator_id, elevator_group_id, fault_id, fault_position, fault_speed, car_speed, car_position, current_landing, callback = null) {

		var _query = `
			SELECT 
				fault_id 
			FROM
				elevator_faults 
			WHERE 
				elevator_id = ? 
			AND 
				elevator_group_id = ?
			ORDER BY 
				date_created
			DESC
		`;

		mysql.pool(_query, [elevator_id, elevator_group_id], function (err, result) {

			var _res = (result && result[0] ? result[0]['fault_id'] : "x");


			//console.log(err,_res,fault_id);
			if (fault_id != 0) {

				console.table({
					"fault_speed": fault_speed,
					"fault_position": fault_position,
					"car_speed": car_speed,
					"car_position": car_position
				});

				_query = `
					INSERT
					INTO
						elevator_faults
						(elevator_id,elevator_group_id,fault_id,fault_position,fault_speed,car_speed,car_position,floor_pi,date_created)
					VALUES
						(?,?,?,?,?,?,?,?,UTC_TIMESTAMP())
				`;
				mysql.pool(_query, [elevator_id, elevator_group_id, fault_id, fault_position, fault_speed, car_speed, car_position, current_landing], function (err, result) {
					callback(err, result);
				})
				sendNotification('faults', fault_id, elevator_group_id, elevator_id, fault_position, fault_speed, current_landing);
			}
		});
	},
	createAlarm: function (elevator_id, elevator_group_id, alarm_id, alarm_position, alarm_speed, car_speed, car_position, current_landing, callback = null) {

		var _query = `
			SELECT 
				alarm_id 
			FROM
				elevator_alarms
			WHERE 
				elevator_id = ? 
			AND 
				elevator_group_id = ?
			ORDER BY 
				date_created
			DESC
		`;

		mysql.pool(_query, [elevator_id, elevator_group_id], function (err, result) {
			var _res = (result && result[0] ? result[0]['alarm_id'] : "x");

			if (alarm_id != 0) {

				console.table({
					"alarm_speed": alarm_speed,
					"alarm_position": alarm_position,
					"car_speed": car_speed,
					"car_position": car_position
				});

				_query = `
					INSERT
					INTO
						elevator_alarms
						(elevator_id,elevator_group_id,alarm_id,alarm_position,alarm_speed,car_speed,car_position,floor_pi,date_created)
					VALUES
						(?,?,?,?,?,?,?,?,UTC_TIMESTAMP())
				`;
				mysql.pool(_query, [elevator_id, elevator_group_id, alarm_id, alarm_position, alarm_speed, car_speed, car_position, current_landing], function (err, result) {
					callback(err, result);
				})
				sendNotification('alarms', alarm_id, elevator_group_id, elevator_id, alarm_position, alarm_speed, current_landing);
			}
		});
	},
	createCarCalls: function (elevator_id, group_id, floors_id, callback = null) {
		floors_id.forEach(function (val) {
			var _query = `
				INSERT
				INTO
					rpt_carcalls
					(group_id,car_id,floor_id,state,date_created)
				VALUES
					(?,?,?,0,UTC_TIMESTAMP())
			`;
			mysql.pool(_query, [group_id, elevator_id, val], function (err, result) {
				callback(err, result);
			})
		})
	},
	createHallCalls: function (group_id, floors_id, direction, callback = null) {
		//console.log(group_id,floors_id,direction)
		floors_id.forEach(function (val) {
			var _query = `
				INSERT
				INTO
					rpt_hallcalls
					(group_id,floor_id,direction,state,date_created)
				VALUES
					(?,?,?,0,UTC_TIMESTAMP())
			`;
			mysql.pool(_query, [group_id, val, direction], function (err, result) {
				//console.log("DBERR::",err);
				callback(err, result);
			})
		})

	},
	createServices: function (elevator_id, group_id, floor_id, mode_of_operation, class_of_operation, callback = null) {
		mysql.pool(`SELECT * from rpt_services where group_id = ? AND car_id = ? ORDER BY id DESC LIMIT 1`, [group_id,elevator_id], function (err1, result1) {

			if (err1){
				console.log(err1);
			}else if(result1.length>0){
				if(result1[0].class_of_operation == class_of_operation && result1[0].mode_of_operation == mode_of_operation){
					mysql.pool('update rpt_services set date_next=UTC_TIMESTAMP() WHERE group_id=? AND car_id=? ORDER BY id DESC LIMIT 1', [group_id, elevator_id, floor_id], function (err, result) {})
				} else{
					var _query = `
				INSERT
				INTO
					rpt_services
					(group_id,car_id,floor_id,mode_of_operation,class_of_operation,date_created,date_next)
				VALUES
					(?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP());`
			mysql.pool(_query, [group_id, elevator_id, floor_id, mode_of_operation, class_of_operation], function (err, result) {
				if (err) console.log(err);

				callback(err, result);
			})
				}
				}else if(result1.length == 0){

				var _query = `
				INSERT
				INTO
					rpt_services
					(group_id,car_id,floor_id,mode_of_operation,class_of_operation,date_created,date_next)
				VALUES
					(?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())
			`;
			mysql.pool(_query, [group_id, elevator_id, floor_id, mode_of_operation, class_of_operation], function (err, result) {
				if (err) console.log(err);

				callback(err, result);
			})

			}

		})		
		
	},

	updateServices: function (elevator_id, group_id, floor_id, callback = null) {
		mysql.pool('update rpt_services set date_next=UTC_TIMESTAMP() WHERE group_id=? AND car_id=? ORDER BY id DESC LIMIT 1', [group_id, elevator_id, floor_id], function (err, result) {
			if (err) console.log(err);
			callback(err, result)
		})
	},
	createWaitTime: function (group, floor, direction, wait_time, max_floors, callback = null) {
		if (wait_time > 5 && wait_time < 10*max_floors) {
			var _query = `
			INSERT
			INTO
				rpt_wait
				(group_id,floor_id,direction,wait_time,date_created)
			VALUES
				(?,?,?,?,UTC_TIMESTAMP())
			`;

			mysql.pool(_query, [group, floor, direction, wait_time], function (err, result) {});
		}
	},
	createFTF: function (group, car, floor_from, floor_to, direction, wait_time, callback = null) {
		var _query = `
		INSERT
		INTO
			rpt_floortfloor
			(group_id,car_id,floor_from,floor_to,direction,wait_time,date_created)
		VALUES
			(?,?,?,?,?,?,UTC_TIMESTAMP())
		`;

		mysql.pool(_query, [group, car, floor_from, floor_to, direction, wait_time], function (err, result) {});
	},
	createProgramEvent: function (type, description, callback = null) {
		var _query = `
		INSERT
		INTO
			rpt_program_events
			(type,description,date_created)
		VALUES
			(?,?,UTC_TIMESTAMP())
		`;

		mysql.pool(_query, [type, description], function (err, result) {});
	}
}
/* Send faults to the notification engine */
function sendNotification(type, id, elevator_group_id, elevator_id, position, speed, current_landing) {
	let job_name = getJobNameByGroupId(elevator_group_id);
	let car_label = getCarLabelByCarId(elevator_id);
	axios
		.post(process.env.NOTIFICATION_ENGINE_URL + '/api/' + type, {
			date_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
			elevator_group_id: elevator_group_id,
			site_id: process.env.SITE_ID,
			floor_pi: current_landing,
			elevator_id: elevator_id,
			car_label: car_label,
			position: position,
			job_name: job_name,
			speed: speed,
			id: id,
			date: new Intl.DateTimeFormat(undefined, {
				dateStyle: 'full',
				timeStyle: 'long'
			}).format(new Date()),
		})
		.then(res => {
			// console.log(res.data)
		})
		.catch(error => {
			// console.error(error)
		})
}

/**
 * Get job name by group id 
 * @param {Int} group_id 
 * @returns {String} job_name
 */
function getJobNameByGroupId(group_id) {
	let config_pi = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];
	let job_name = '';
	let job = _.find(config_pi, {
		GroupID: group_id
	});
	if (job != undefined && Object.keys(job).length) {
		job_name = job.JobName;
	}
	return job_name;
}

/**
 * Get car label by car id 
 * @param {Int} group_id 
 * @returns {String} car_label
 */
function getCarLabelByCarId(car_id) {
	let config_group1 = JSON.parse(fs.readFileSync(process.env.SETTINGS_GROUP_LOCATION + '/Group1.json', 'utf-8')).Cars;
	let car_label = '';
	let car = {};
	if (config_group1 != undefined) {
		car = _.find(config_group1, (car) => {
			return car['Id'] == car_id
		})
	}
	if (car != undefined && Object.keys(car).length) {
		car_label = car.Label;
	}
	return car_label;
}
