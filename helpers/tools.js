
const moment = require('moment');
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const { execSync } = require("child_process");

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

module.exports = {

    getRedisKeyValue : function (key) {
        var res = execSync('redis-cli -h redis_lm get ' + key).toString().slice(0, -1);
        if (res) {
            return res
        } else {
            return null
        }
    },
    setRedisKeyValue: function (key, value) {
        var res = execSync('redis-cli -h redis_lm set ' + key + ' ' + value);
        var res = execSync('redis-cli -h redis_lm SAVE');
        return 0
    },
    requestsRequired: function(type1, group_id) {
        var last_update_local = this.getRedisKeyValue("requests:" + group_id + ":last_updated_local:"+type1);
        var last_update_remote = this.getRedisKeyValue("requests:" + group_id + ":last_updated_remote");
        if (! last_update_local) {
            this.setRedisKeyValue("requests:" + group_id + ":last_updated_local:"+type1, 0)
            last_update_local = 0
        }
        if (! last_update_remote) {
            this.setRedisKeyValue("requests:" + group_id + ":last_updated_remote", 0)
            last_update_remote = 0
        }

        if (last_update_local == 0 || last_update_remote == 0) {
            return true
        } else if (last_update_local < last_update_remote) {
            return true
        } else {
            return false
        }
    },
    updateLastUpdateLocal: function(type1, group_id) {
        var last_update_remote = this.getRedisKeyValue("requests:" + group_id + ":last_updated_remote");
        if (! last_update_remote) {
            this.setRedisKeyValue("requests:" + group_id + ":last_updated_remote", 0)
            last_update_remote = 0
        }
        this.setRedisKeyValue("requests:" + group_id + ":last_updated_local:"+type1, last_update_remote)
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

    updateParametersInRedis: function(groupID, pi_ip) {
        var default_keys = ["8:112","8:92", "8:174", "32:0", "32:1", "32:2", "32:4", "32:5", "32:6"]
        var keys=[]
		keys = default_keys.concat(keys).unique();
		keys = JSON.stringify(keys)
		keys = keys.replace(/"/g, "%22")
        axios.get(`http://`+ pi_ip + `/api/arrayparameter?list=`+keys, {timeout: 3000}).then((response) => {
            var jsonObj = {};
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                const key = Object.keys(response.data)[index];
                const value = response.data[key]
                jsonObj[key] = value
            }
            jsonObj2 = JSON.stringify(JSON.stringify(jsonObj))
            this.setRedisKeyValue("requests:" + groupID + ":arrayparameters", jsonObj2)
            this.updateLastUpdateLocal("arrayparameters", groupID)
        }).catch((err) => {
            console.log(err)
            var default_response = '{"8:92":{"id":557,"type":"8","index":"92","page":"","name":"Number of FLRs","value1":"32","value2":"32","value3":"32","value4":"32","value5":"32","value6":"32","value7":"32","value8":"32","sw_name":"NumFloors"},"8:174":{"id":639,"type":"8","index":"174","page":"","name":"Group Landing Offset","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"GroupLandingOffset"},"32:0":{"id":2124,"type":"32","index":"0","page":"","name":"Front Opening Map 0","value1":"4294967295","value2":"4294967295","value3":"4294967295","value4":"4294967295","value5":"4294967295","value6":"4294967295","value7":"4294967295","value8":"4294967295","sw_name":"OpeningBitmapF_0"},"32:1":{"id":2125,"type":"32","index":"1","page":"","name":"Front Opening Map 1","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapF_1"},"32:2":{"id":2126,"type":"32","index":"2","page":"","name":"Front Opening Map 2","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapF_2"},"32:4":{"id":2128,"type":"32","index":"4","page":"","name":"Rear Opening Map 0","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_0"},"32:5":{"id":2129,"type":"32","index":"5","page":"","name":"Rear Opening Map 1","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_1"},"32:6":{"id":2130,"type":"32","index":"6","page":"","name":"Rear Opening Map 2","value1":"0","value2":"0","value3":"0","value4":"0","value5":"0","value6":"0","value7":"0","value8":"0","sw_name":"OpeningBitmapR_2"}}'
            this.setRedisKeyValue("requests:" + groupID + ":arrayparameters", JSON.stringify(default_response))
            this.setRedisKeyValue("requests:" + groupID + ":last_updated_local:arrayparameters", 0)
        })
    },
    updateCarWithOffsetInRedis: function(groupID, pi_ip) {
        axios.get(`http://`+ pi_ip + `/ajax/get_pi_labels/`, {timeout: 3000}).then((response) => {
            var jsonObj = response.data;
            this.setRedisKeyValue("requests:" + groupID + ":cars_with_offset", JSON.stringify(jsonObj))
            this.updateLastUpdateLocal("cars_with_offset", groupID)
        }).catch((err) => {
            console.log(err)
            var default_response = []
            for (var i=0; i<95; i++){
                var obj = {"carIndex": i.toString(),"cars": []}
                if (i != 0) {
                    var obj2 ={"value": i.toString()}
                } else {
                    var obj2 ={"value": "GF"}
                }
                for (var j=0; j<8;j++){
                    obj["cars"].push(obj2)
                }
                default_response.push(obj)
            }
            default_response = JSON.stringify(default_response)
            this.setRedisKeyValue("requests:" + groupID + ":cars_with_offset", JSON.stringify(default_response))
            this.setRedisKeyValue("requests:" + groupID + ":last_updated_local:cars_with_offset", 0)
        })
    },
    updateSettingsInRedis: function(groupID, pi_ip) {
        axios.get(`http://`+ pi_ip + `/api/system/settings`, {timeout: 2000}).then((response) => {
            var jsonObj = {} 
            jsonObj[groupID] = response.data; 
            this.setRedisKeyValue("requests:" + groupID + ":settings", JSON.stringify(JSON.stringify(response.data)))
            this.updateLastUpdateLocal("settings", groupID)
        }).catch((err) => {
            console.log(err)
            this.setRedisKeyValue("requests:" + groupID + ":settings", JSON.stringify(JSON.stringify({
                "number_of_cars": "1",
                "job_name": groupID,
                "car_label_1": "1"
            })))
            this.setRedisKeyValue("requests:" + groupID + ":last_updated_local:settings", 0)
        })
    },

    updateAllDataInRedis: function(groupID, pi_ip) {
        this.updateParametersInRedis(groupID, pi_ip);
        this.updateCarWithOffsetInRedis(groupID, pi_ip);
        this.updateSettingsInRedis(groupID, pi_ip);
    },

    getRPITimeZone: function(groupID) {
        var pi_json = JSON.parse(fs.readFileSync('configs/pi/pi.json', 'utf-8'))['data'];
        pi_json.forEach(pi => {
            if (pi.GroupID == groupID) {
                var pi_ip = pi.location.split(':')[0];
                axios.get(`http://`+ pi_ip + `3000/api/get_timezone/`, {timeout: 2000}).then((response) => {
                    var jsonObj = response.data;
                    return jsonObj;
                }).catch((err) => {
                    console.log(err)
                    return {"Status":405, "Message":"RPI is not connected"};
                })
            }
        })
    },
    convertTZ: function(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    },
    getUtcTimestamp: function(){
    	var now = new Date;
		var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
      	now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      	return utc_timestamp;
    },
    getCurrentTimestamp: function(){
    	var date = new Date();
		var timestamp = date.getTime();
		return timestamp;
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
    timeUTC: function(value, format) {
        return new Promise((resolve, reject) => {
            try { 
                resolve(moment(value, format).format(format))
            }
            catch (err) {
                reject(err)
            }
        })
    },
    datatableColumnName: function(query){
        var _cols = query['columns'];
        _cols.forEach(function(col,i){
            if(col.name == ''){
                query['columns'][i]['name'] = col.data;
            }
        });
        return query;
    },
    hexToString: function(hex){
        const convert = (from, to) => str => Buffer.from(str, from).toString(to);
        const hexToUtf8 = convert('hex', 'utf8');

        return hexToUtf8(hex);
    },
    formatIP: (ip) =>{
        let rgx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let test = rgx.test(ip);
        return test;
    },
    formatMAC: (mac) =>{
        let rgx = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        let test = rgx.test(mac);
        return test;
    },
    getScanned: async (ip="", mode=2) =>{
        const { execSync } = require('child_process');
        stdout = execSync('redis-cli -h redis_lm get scannedDevices').toString()
        stdout = stdout.replace(/\r?\n|\r/g, "");
        if (stdout) {
            devices = JSON.parse(stdout)
            return new Promise((resolve, reject)=>{
                resolve(devices)
            })
        } else {
            return new Promise((resolve, reject)=>{
                resolve([])
            })
        }
    },
    scan: async (ip="", mode=2) =>{
        const { exec } = require('child_process');
        var ssh_exec = require('node-ssh-exec')
        
        return new Promise((resolve, reject)=>{
            axios.get(`http://`+ "172.17.0.1" + `:3000/api/system/devices`, {timeout: 3000}).then((stdout) => {
                // the *entire* stdout and stderr (buffered)
                var _line = stdout.data
                var _connectedUsers = {};
                var collection = [];
                _line.forEach(function (val, i) {
                    if (i != 0) {
                        var _v = val.split(' ');
                        var itemIndex = 0;
                        var _ip = "";
                        var _mac = "";
                        _v.forEach(function (_i) {
                            if (_i != "") {
                                switch(itemIndex){
                                    case 0:
                                        _ip = _i;
                                        break;
                                    case 2:
                                        // if ( ! _ip.startsWith("172.")) {
                                            _mac = _i;
                                            if(ip && mode === 1){
                                                if(ip === _ip){
                                                    collection = [...collection, {ipv4: _ip, mac: _mac}];
                                                }
                                            }else{
                                                collection = [...collection, {ipv4: _ip, mac: _mac}];
                                            }
                                        // }
                                        break;
                                }
                                itemIndex += 1;
                            }
                        })
                    }
                });
                exec('redis-cli -h redis_lm set scannedDevices ' + JSON.stringify(JSON.stringify(collection)), (err, stdout, stderr) => {})
                resolve(collection)
            }).catch((err) => {
                console.log('arp error:===>',err);
                resolve([]) 
            })
        })
    },
    getDayValue: (param) => {
        try{
            
            if(Array.isArray(param)){
                if(param.length){
                    return param;
                }
                return false;
            }else if (param instanceof Object && typeof param === "object"){
                if(typeof param.day !== 'undefined' && typeof param.month !== "undefined" && typeof param.year !== "undefined"){
                    let date = param.year + "-" + MOMENT().month(param.month).format("MM") + "-" + param.day;
                    date = MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D");
                    return date;
                }
                if(typeof param.week !== "undefined"){
                    if(param.week && typeof param.day === "undefined"){
                        const week = module.exports.getCurrentWeekInMonth() === parseInt(param.week.split("")[0]) ? true : false;
        
                        if(week){
                            return MOMENT().format("Y-M-D");
                        }
                    }
                    if(param.week && typeof param.day !== "undefined" && param.month !== "undefined"){
                        // const week = module.exports.getCurrentWeekInMonth() === parseInt(param.week.split("")[0]) ? true : false;
                        const month = MOMENT().month(param.month).format("M");
                        const week = param.week ? parseInt(param.week.split("")[0]) : false;
                        // console.log(param);
                        if(week && month > 0){
                            // return MOMENT().day(param.day).format("Y-M-D");
                            // return MOMENT(MOMENT().week(week).day(param.day).format("Y-M-D"), "Y-M-D").month(parseInt(month)-1).add(2, 'days').format("Y-M-D");
                            // console.log(week, month);
                            // return MOMENT(MOMENT().week(week).day(param.day).add('2', 'days').format("Y-M-D"), "Y-M-D").month(parseInt(month)-1).format("Y-M-D");
                            if(MOMENT().isoWeekday(param.day).format("Y-M-D") === MOMENT().format("Y-M-D") && module.exports.getCurrentWeekInMonth() === week){
                                return MOMENT().isoWeekday(param.day).format("Y-M-D");
                            }else{
                                return MOMENT().isoWeekday(param.day).week(week).month(parseInt(month)-1).format("Y-M-D")
                            }
                        }
                    }
                    return false;
                }
                if(typeof param.year === "undefined"){
                    if(param.day !== "undefined" && param.month !== "undefined"){
                        const date = MOMENT().format("Y") + "-" + MOMENT().month(param.month).format("MM") + "-" + param.day;
                        return MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D");
                    }
                    return false;
                }
            } else{
                return false;
            }
        }catch(err){
            console.log(err.message)
        }
    },
    getCurrentWeekInMonth: () =>{
        const now = MOMENT();
        const week = Math.ceil(now.date() / 7);
    
        return week;
    },
    isDayToday: (dateArray) =>{
        return dateArray.includes(MOMENT().format('ddd'))
    },
    getServerTimezone: () =>{
        return MOMENT().format("Z");
    }
};
