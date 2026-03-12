const {
	Alarms, RptAlarm, Faults, RptFault, RptDoors,
	Report, RptCarCalls, RptHallCalls, RptServices,
	RptWait, RptFloorToFloor, RptProgramEvents
} = require('../../../database/models');
const { Op } = require('sequelize');
const TOOLS = require('../../../helpers/tools.js');
const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');
const MOMENT = require('moment');

var car_modes = { "0": "offline", "1": "offline", "2": "offline", "3": "offline", "4": "offline", "5": "offline", "6": "offline", "7": "offline" }

module.exports = {
	createDoorsReport: function (group_id, car_id, floor_id, door_state, time_sec, opening) {
		RptDoors.create({
			group_id: group_id,
			car_id: car_id,
			floor_id: floor_id,
			door_state: door_state,
			time_sec: time_sec,
			opening: opening,
			date_created: new Date()
		}).catch(err => {
			// Handle error
		});
	},
	createReportLog: function (group_id, messageType, message) {
		Report.create({
			group_id: group_id,
			messagetype: messageType,
			message: message,
			date_created: new Date()
		}).catch(err => {
			// Handle error
		});
	},
	createFault: function (elevator_id, elevator_group_id, fault_id, fault_position, fault_speed, car_speed, car_position, current_landing, callback = null) {
		if (fault_id != 0) {
			console.table({
				"fault_speed": fault_speed,
				"fault_position": fault_position,
				"car_speed": car_speed,
				"car_position": car_position
			});

			// Generate a unique ID if needed or let DB handle it. 
			// Table elevator_faults has STRING(255) id as PK in migrations.
			const id = elevator_group_id + "-" + elevator_id + "-" + fault_id + "-" + new Date().getTime();

			Faults.create({
				id: id,
				elevator_id: elevator_id,
				elevator_group_id: elevator_group_id,
				fault_id: fault_id,
				fault_position: fault_position,
				fault_speed: fault_speed,
				car_speed: car_speed,
				car_position: car_position,
				fault_floor_label: current_landing,
				date_time: new Date()
			}).then(result => {
				if (callback) callback(null, result);
				sendNotification('faults', fault_id, elevator_group_id, elevator_id, fault_position, fault_speed, current_landing);
			}).catch(err => {
				if (callback) callback(err);
			});
		}
	},
	createAlarm: function (elevator_id, elevator_group_id, alarm_id, alarm_position, alarm_speed, car_speed, car_position, current_landing, callback = null) {
		if (alarm_id != 0) {
			console.table({
				"alarm_speed": alarm_speed,
				"alarm_position": alarm_position,
				"car_speed": car_speed,
				"car_position": car_position
			});

			const id = elevator_group_id + "-" + elevator_id + "-" + alarm_id + "-" + new Date().getTime();

			Alarms.create({
				id: id,
				elevator_id: elevator_id,
				elevator_group_id: elevator_group_id,
				alarm_id: alarm_id,
				alarm_position: alarm_position,
				alarm_speed: alarm_speed,
				car_speed: car_speed,
				car_position: car_position,
				alarm_floor_label: current_landing,
				date_time: new Date()
			}).then(result => {
				if (callback) callback(null, result);
				sendNotification('alarms', alarm_id, elevator_group_id, elevator_id, alarm_position, alarm_speed, current_landing);
			}).catch(err => {
				if (callback) callback(err);
			});
		}
	},
	createCarCalls: function (elevator_id, group_id, floors_id, callback = null) {
		floors_id.forEach(function (val) {
			RptCarCalls.create({
				group_id: group_id,
				car_id: elevator_id,
				floor_id: val,
				state: 0,
				date_created: new Date()
			}).then(result => {
				if(callback) callback(null, result);
			}).catch(err => {
				if(callback) callback(err);
			});
		})
	},
	createHallCalls: function (group_id, floors_id, direction, callback = null) {
		floors_id.forEach(function (val) {
			RptHallCalls.create({
				group_id: group_id,
				floor_id: val,
				direction: direction,
				state: 0,
				date_created: new Date()
			}).then(result => {
				if(callback) callback(null, result);
			}).catch(err => {
				if(callback) callback(err);
			});
		})

	},
	createServices: function (elevator_id, group_id, floor_id, mode_of_operation, class_of_operation, callback = null) {
		RptServices.findOne({
			where: { group_id: group_id, car_id: elevator_id },
			order: [['id', 'DESC']]
		}).then(lastService => {
			if (lastService && lastService.class_of_operation == class_of_operation && lastService.mode_of_operation == mode_of_operation) {
				return lastService.update({ date_next: new Date() });
			} else {
				return RptServices.create({
					group_id: group_id,
					car_id: elevator_id,
					floor_id: floor_id,
					mode_of_operation: mode_of_operation,
					class_of_operation: class_of_operation,
					date_created: new Date(),
					date_next: new Date()
				});
			}
		}).then(result => {
			if (callback) callback(null, result);
		}).catch(err => {
			if (callback) callback(err);
		});
	},

	updateServices: function (elevator_id, group_id, floor_id, callback = null) {
		RptServices.findOne({
			where: { group_id: group_id, car_id: elevator_id },
			order: [['id', 'DESC']]
		}).then(lastService => {
			if (lastService) {
				return lastService.update({ date_next: new Date() });
			}
		}).then(result => {
			if (callback) callback(null, result);
		}).catch(err => {
			if (callback) callback(err);
		});
	},
	createWaitTime: function (group, floor, direction, wait_time, max_floors, callback = null) {
		if (wait_time > 5 && wait_time < 10 * max_floors) {
			RptWait.create({
				group_id: group,
				floor_id: floor,
				direction: direction,
				wait_time: wait_time,
				date_created: new Date()
			}).catch(err => { });
		}
	},
	createFTF: function (group, car, floor_from, floor_to, direction, wait_time, callback = null) {
		RptFloorToFloor.create({
			group_id: group,
			car_id: car,
			floor_from: floor_from,
			floor_to: floor_to,
			direction: direction,
			wait_time: wait_time,
			date_created: new Date()
		}).catch(err => { });
	},
	createProgramEvent: function (type, description, callback = null) {
		RptProgramEvents.create({
			type: type,
			description: description,
			date_created: new Date()
		}).catch(err => { });
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
			alarm_floor_label: current_landing,
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
