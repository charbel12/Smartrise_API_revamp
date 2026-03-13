const { Faults, SystemFaults, sequelize } = require('../../../database/models');
const { Op } = require('sequelize');
const TOOLS = require('../../../helpers/tools.js');
const MOMENT = require('moment');
const async = require('async');

module.exports = {
	datatables: function(groupID,carID, data, callback = null){
		const limit = parseInt(data.length) || 10;
        const offset = parseInt(data.start) || 0;
        const search = data.search ? data.search.value : '';

        let where = {
            elevator_id: carID,
            elevator_group_id: groupID,
            status: true
        };

        if (search) {
            // Attempt to handle date search if present in the data.search.value
            // The original code had some moment logic for search value.
            where[Op.or] = [
                { fault_name: { [Op.iLike]: `%${search}%` } },
                { fault_description: { [Op.iLike]: `%${search}%` } },
                { faults_solution: { [Op.iLike]: `%${search}%` } },
                { fault_floor_label: { [Op.iLike]: `%${search}%` } }
            ];
            if (!isNaN(search)) {
                where[Op.or].push({ fault_number: parseInt(search) });
            }
        }

        Faults.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            order: [['date_time', 'DESC']],
            raw: true
        }).then(result => {
            const response = {
                draw: data.draw,
                recordsTotal: result.count,
                recordsFiltered: result.count,
                data: result.rows.map(row => ({
                    ...row,
                    efid: row.id || row.fault_number,
                    number: row.fault_number,
                    definition: row.fault_description,
                    carid: row.elevator_id,
                    floor: row.fault_floor_label,
                    new_date: row.date_time ? MOMENT(row.date_time).format('YYYY-MM-DD HH:mm:ss') : null
                }))
            };
            callback(null, response);
        }).catch(err => {
            callback(err);
        });
	},
	delete: function(groupID,carID,callback = null){
		Faults.destroy({ where: { elevator_id: carID } })
            .then(result => callback(null, result))
            .catch(err => callback(err));
    },
    clearAll: function(group,callback = null){
		Faults.destroy({ where: { elevator_group_id: group } })
            .then(result => callback(null, result))
            .catch(err => callback(err));
	},
	import: function(data,callback = null){
		callback(null, []);
	},
	export: function(data,callback = null){
		callback(null, []);
	},
	get: function(id,callback = null){
        SystemFaults.findByPk(id)
            .then(result => callback(null, result ? [result.toJSON()] : []))
            .catch(err => callback(err));
    },
    getNumber: function(number,callback = null){
        SystemFaults.findOne({ where: { number: number } })
            .then(result => callback(null, result ? [result.toJSON()] : []))
            .catch(err => callback(err));
    },
    getCarFault: function(id, data=null, callback = null){
		Faults.findOne({
            where: { id: id },
            include: [{
                model: SystemFaults,
                as: 'system_fault',
                required: false
            }],
            raw: true,
            nest: true
        }).then(result => {
            if (result) {
                const formatted = {
                    carid: result.elevator_id,
                    date_created: result.date_time,
                    new_date: result.date_time ? MOMENT(result.date_time).format('YYYY-MM-DD HH:mm:ss') : null,
                    floor_pi: result.fault_floor_label,
                    car_speed: result.car_speed,
                    fault_speed: result.fault_speed,
                    fault_position: result.fault_position,
                    ...result.system_fault
                };
                callback(null, [formatted]);
            } else {
                callback(null, []);
            }
        }).catch(err => callback(err));
    },
    getOldestFaults: function(callback = null){
        Faults.findOne({
            where: { date_modified: { [Op.ne]: null } },
            order: [['id', 'DESC']],
            raw: true
        }).then(result => {
            if (result) {
                result.date_modified = MOMENT(result.date_modified).format("MM/DD/YYYY HH:mm:ss");
                result.timezone = TOOLS.getServerTimezone();
                callback(null, result);
            } else {
                callback(null, []);
            }
        }).catch(err => callback(err));
    },
	all: function(data,callback = null){
		const limit = parseInt(data.length) || 10;
        const offset = parseInt(data.start) || 0;
        const search = data.search ? data.search.value : '';

        let where = search ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } } // description column name check
            ]
        } : {};

        if (search && !isNaN(search)) {
            where[Op.or].push({ number: parseInt(search) });
        }

        SystemFaults.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            raw: true
        }).then(result => {
            const response = {
                draw: data.draw,
                recordsTotal: result.count,
                recordsFiltered: result.count,
                data: result.rows
            };
            callback(null, response);
        }).catch(err => {
            callback(err);
        });
	},
}