const { Alarms, SystemAlarms, sequelize } = require('../../../database/models');
const { Op } = require('sequelize');
const TOOLS = require('../../../helpers/tools.js');
const async = require('async');

module.exports = {
    datatables: function (groupID, carID, data, callback = null) {
        const QueryBuilder = require('datatable');
        
        // This still uses the QueryBuilder to parse DataTables params, 
        // but we'll use sequelize to execute the actual queries for better security and abstraction.
        // However, the user specifically asked to use Sequelize. 
        // findAndCountAll is the standard Sequelize way to handle DataTables.
        
        const limit = parseInt(data.length) || 10;
        const offset = parseInt(data.start) || 0;
        const search = data.search ? data.search.value : '';
        
        let where = {
            elevator_id: carID,
            elevator_group_id: groupID,
            status: true
        };

        if (search) {
            where[Op.or] = [
                { alarm_name: { [Op.iLike]: `%${search}%` } },
                { alarm_description: { [Op.iLike]: `%${search}%` } },
                { alarm_solution: { [Op.iLike]: `%${search}%` } }
            ];
            // If it's a number, also search in alarm_id
            if (!isNaN(search)) {
                where[Op.or].push({ alarm_id: parseInt(search) });
            }
        }

        Alarms.findAndCountAll({
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
                    eaid: row.id || row.alarm_number,
                    number: row.alarm_number,
                    definition: row.alarm_description,
                    carid: row.elevator_id,
                    floor: row.alarm_floor_label,
                    new_date: TOOLS.dateTimeUTC(row.date_time, 'YYYY-MM-DD HH:mm:ss')
                }))
            };
            callback(null, response);
        }).catch(err => {
            callback(err);
        });
    },
    delete: function (groupID, carID, callback = null) {
        Alarms.destroy({ where: { elevator_id: carID } })
            .then(result => callback(null, result))
            .catch(err => callback(err));
    },
    clearAll: function (groupId, callback = null) {
        Alarms.destroy({ where: { elevator_group_id: groupId } })
            .then(result => callback(null, result))
            .catch(err => callback(err));
    },
    import: function (data, callback = null) {
        callback(null, []);
    },
    export: function (data, callback = null) {
        callback(null, []);
    },
    get: function (id, callback = null) {
        SystemAlarms.findOne({ where: { number: id } })
            .then(result => callback(null, result ? [result.toJSON()] : []))
            .catch(err => callback(err));
    },
    getCarAlarm: function (id, data=null, callback = null) {
        Alarms.findOne({
            where: { id: id },
            include: [{
                model: SystemAlarms,
                as: 'system_alarms',
                required: false
            }],
            raw: true,
            nest: true
        }).then(result => {
            if (result) {
                const formatted = {
                    carid: result.elevator_id,
                    date_created: result.date_time,
                    new_date: result.date_time ? result.date_time.toISOString().replace('T', ' ').substring(0, 19) : null,
                    floor_pi: result.alarm_floor_label,
                    car_speed: result.alarms_car_speed_fpm,
                    alarm_speed: result.alarms_command_speed_fpm,
                    alarm_position: result.alarm_position,
                    ...result.system_alarms
                };
                callback(null, [formatted]);
            } else {
                callback(null, []);
            }
        }).catch(err => callback(err));
    },

    all: function (data, callback = null) {
        const limit = parseInt(data.length) || 10;
        const offset = parseInt(data.start) || 0;
        const search = data.search ? data.search.value : '';

        let where = search ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ]
        } : {};

        if (search && !isNaN(search)) {
            where[Op.or].push({ number: parseInt(search) });
        }

        SystemAlarms.findAndCountAll({
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
    }

}