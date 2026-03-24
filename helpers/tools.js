
const moment = require('moment');
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const axios = require('axios');
const fs = require('fs');
const redis = require('redis');
const { execSync } = require("child_process");

const client = redis.createClient({
    url: 'redis://redis_lm:6379'
});
client.on('error', err => console.error('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
    } catch (e) {
        console.error('Failed to connect to Redis initially:', e);
    }
})();


const pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

module.exports = {
    redisClient: client,

    getRedisKeyValue: async function (key) {
        try {
            const value = await client.get(key);
            return value;
        } catch (err) {
            console.error("Error fetching from Redis:", err);
            return null;
        }
    },
    setRedisKeyValue: async function (key, value) {
        try {
            await client.set(key, String(value));
        } catch (err) {
            console.error("Redis Set Error", err);
        }
        return 0
    },

    extendDefaults: function (source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    },


    getRPITimeZone: function (groupID) {
        pi_json.forEach(pi => {
            if (pi.GroupID == groupID) {
                var pi_ip = pi.location.split(':')[0];
                axios.get(`http://` + pi_ip + `3000/api/get_timezone/`, { timeout: 2000 }).then((response) => {
                    var jsonObj = response.data;
                    return jsonObj;
                }).catch((err) => {

                    return { "Status": 405, "Message": "RPI is not connected" };
                })
            }
        })
    },


    dateTimeUTC: async function (value, format) {
        return new Promise((resolve, reject) => {
            try {
                resolve(moment(value).format(format))
            } catch (err) {
                reject(err)
            }
        })
    },
    timeUTC: function (value, format) {
        return new Promise((resolve, reject) => {
            try {
                resolve(moment(value, format).format(format))
            }
            catch (err) {
                reject(err)
            }
        })
    },
    datatableColumnName: function (query) {
        var _cols = query['columns'];


        _cols.forEach(function (col, i) {
            if (col.name == '') {
                query['columns'][i]['name'] = col.data;
            }
        });
        return query;
    },

    getDayValue: (param) => {
        try {

            if (Array.isArray(param)) {
                if (param.length) {
                    return param;
                }
                return false;
            } else if (param instanceof Object && typeof param === "object") {
                if (typeof param.day !== 'undefined' && typeof param.month !== "undefined" && typeof param.year !== "undefined") {
                    let date = param.year + "-" + MOMENT().month(param.month).format("MM") + "-" + param.day;
                    date = MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D");
                    return date;
                }
                if (typeof param.week !== "undefined") {
                    if (param.week && typeof param.day === "undefined") {
                        const week = module.exports.getCurrentWeekInMonth() === parseInt(param.week.split("")[0]) ? true : false;

                        if (week) {
                            return MOMENT().format("Y-M-D");
                        }
                    }
                    if (param.week && typeof param.day !== "undefined" && param.month !== "undefined") {
                        // const week = module.exports.getCurrentWeekInMonth() === parseInt(param.week.split("")[0]) ? true : false;
                        const month = MOMENT().month(param.month).format("M");
                        const week = param.week ? parseInt(param.week.split("")[0]) : false;
                        if (week && month > 0) {
                            // return MOMENT().day(param.day).format("Y-M-D");
                            // return MOMENT(MOMENT().week(week).day(param.day).format("Y-M-D"), "Y-M-D").month(parseInt(month)-1).add(2, 'days').format("Y-M-D");
                            // return MOMENT(MOMENT().week(week).day(param.day).add('2', 'days').format("Y-M-D"), "Y-M-D").month(parseInt(month)-1).format("Y-M-D");
                            if (MOMENT().isoWeekday(param.day).format("Y-M-D") === MOMENT().format("Y-M-D") && module.exports.getCurrentWeekInMonth() === week) {
                                return MOMENT().isoWeekday(param.day).format("Y-M-D");
                            } else {
                                return MOMENT().isoWeekday(param.day).week(week).month(parseInt(month) - 1).format("Y-M-D")
                            }
                        }
                    }
                    return false;
                }
                if (typeof param.year === "undefined") {
                    if (param.day !== "undefined" && param.month !== "undefined") {
                        const date = MOMENT().format("Y") + "-" + MOMENT().month(param.month).format("MM") + "-" + param.day;
                        return MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D");
                    }
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {

        }
    },
    getCurrentWeekInMonth: () => {
        const now = MOMENT();
        const week = Math.ceil(now.date() / 7);

        return week;
    },

    getServerTimezone: () => {
        return MOMENT().format("Z");
    }
};
