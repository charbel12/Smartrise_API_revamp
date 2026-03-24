const {
	Alarms, RptAlarm, Faults, RptFault, RptDoors,
	Report, RptCarCalls, RptHallCalls, RptServices,
	RptWait, RptFloorToFloor, RptProgramEvents
} = require('../../../database/models');
const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');

const redisClient = require('../../../helpers/tools.js').redisClient;

function pushToQueue(model, operation, payload, condition) {
    return new Promise((resolve, reject) => {
        if (!model || !model.tableName) {
            return reject(new Error("Invalid model"));
        }
        const msg = {
            table: model.tableName,
            operation: operation,
            data: payload,
            condition: condition || {}
        };
        redisClient.lPush('db_write_queue', JSON.stringify(msg))
            .then(() => resolve(true))
            .catch(e => {
                console.error(`Redis DB Queue Error (${model.tableName}):`, e);
                reject(e);
            });
    });
}

var car_modes = { "0": "offline", "1": "offline", "2": "offline", "3": "offline", "4": "offline", "5": "offline", "6": "offline", "7": "offline" }

module.exports = {
    car_modes,
	createDoorsReport: function (group_id, car_id, floor_id, door_state, time_sec, opening) {
		pushToQueue(RptDoors, 'insert', {
			group_id: group_id,
			car_id: car_id,
			floor_id: floor_id,
			door_state: door_state,
			time_sec: time_sec,
			opening: opening,
			date_created: new Date()
		}).catch(err => console.error(err));
	},
	createReportLog: function (group_id, messageType, message) {
		pushToQueue(Report, 'insert', {
			group_id: group_id,
			messagetype: messageType,
			message: message,
			date_created: new Date()
		}).catch(err => console.error(err));
	},
	createCarCalls: function (elevator_id, group_id, floors_id, callback = null) {
        const promises = floors_id.map(val => {
			return pushToQueue(RptCarCalls, 'insert', {
				group_id: group_id,
				car_id: elevator_id,
				floor_id: val,
				state: 0,
				date_created: new Date()
			});
		});
        Promise.all(promises)
            .then(() => { if (callback) callback(null, true); })
            .catch(err => { if (callback) callback(err); });
	},
	createHallCalls: function (group_id, floors_id, direction, callback = null) {
		const promises = floors_id.map(val => {
			return pushToQueue(RptHallCalls, 'insert', {
				group_id: group_id,
				floor_id: val,
				direction: direction,
				state: 0,
				date_created: new Date()
			});
		});
        Promise.all(promises)
            .then(() => { if (callback) callback(null, true); })
            .catch(err => { if (callback) callback(err); });
	},
	createServices: function (elevator_id, group_id, floor_id, mode_of_operation, class_of_operation, callback = null) {
		RptServices.findOne({
			where: { group_id: group_id, car_id: elevator_id },
			order: [['id', 'DESC']]
		}).then(lastService => {
            let promise;
			if (lastService && lastService.class_of_operation == class_of_operation && lastService.mode_of_operation == mode_of_operation) {
				promise = pushToQueue(RptServices, 'update', { date_next: new Date() }, { id: lastService.id });
			} else {
				promise = pushToQueue(RptServices, 'insert', {
					group_id: group_id,
					car_id: elevator_id,
					floor_id: floor_id,
					mode_of_operation: mode_of_operation,
					class_of_operation: class_of_operation,
					date_created: new Date(),
					date_next: new Date()
				});
			}
            return promise;
		}).then(() => {
            if (callback) callback(null, true);
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
                return pushToQueue(RptServices, 'update', { date_next: new Date() }, { id: lastService.id });
			}
            return Promise.resolve();
		}).then(() => {
            if(callback) callback(null, true);
        }).catch(err => {
			if (callback) callback(err);
		});
	},
	createWaitTime: function (group, floor, direction, wait_time, max_floors, callback = null) {
		if (wait_time > 5 && wait_time < 10 * max_floors) {
			pushToQueue(RptWait, 'insert', {
				group_id: group,
				floor_id: floor,
				direction: direction,
				wait_time: wait_time,
				date_created: new Date()
			}).catch(err => {});
		}
	},
	createFTF: function (group, car, floor_from, floor_to, direction, wait_time, callback = null) {
		pushToQueue(RptFloorToFloor, 'insert', {
			group_id: group,
			car_id: car,
			floor_from: floor_from,
			floor_to: floor_to,
			direction: direction,
			wait_time: wait_time,
			date_created: new Date()
		}).catch(err => {});
	},
	createProgramEvent: function (type, description, callback = null) {
		pushToQueue(RptProgramEvents, 'insert', {
			type: type,
			description: description,
			date_created: new Date()
		}).catch(err => {});
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
