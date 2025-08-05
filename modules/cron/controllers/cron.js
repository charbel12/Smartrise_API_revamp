require('dotenv').config()
const MODEL = require('../../schedules/models/index.js')
const MODEL_SECURITY = require('../../security/models/index.js');
const TOOLS = require('../../../helpers/tools.js');
const moment = require('moment')
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const WebSocket = require('ws');
const { isDayToday } = require('../../../helpers/tools.js');

module.exports = {
    processSchedule: function() {
        /**  One time process */
        try{
            MODEL.getOneTime(function(err, result) {
                if (err) {
                    console.log(err)
                    return
                }
                /** Loop One time Value */
                result.forEach(function(item) {
                    const dayValueObject = JSON.parse(item.day_value)
                    if(isTodayDate(TOOLS.getDayValue(dayValueObject.value)) && isTodayStartTime(item.start_time)){
                        if (item.secure_all === 1) {
                            startBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                
                                // stopBroadcastAll(item.group_id);
                                startBroadcast(securityItems)
                            })
                        }
                    }
                    
                    // if (isTodayDate(getDayValue(dayValueObject.value)) && isTodayEndTime(item.end_time)) {
                    if(durationDay({day: TOOLS.getDayValue(dayValueObject.value), ending_day: item.ending_day}) && isTodayEndTime(item.end_time)){
                        if (item.secure_all === 1) {
                            stopBroadcastAll(item.group_id)
                        } else {
                            
                            // stopBroadcastAll(item.group_id)
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                stopBroadcast(securityItems)
                            })
                        }
                    }
                })
                /** End of Loop */
            });
        }catch(err){
            console.log("> GET ONE TIME ERROR ::: ",err.message);
        }
        /** End of One time process */

        /**  Yearly process */
        try{
            MODEL.getYearly(function(err, result) {
                if (err) {
                    console.log(err)
                    return
                }
                //console.log('result ====', result)
                /** Loop Yearly Value */
                result.forEach(function(item) {
                    const dayValueObject = JSON.parse(item.day_value)
                    //console.log('test_value', isTodayDateWOYear(dayValueObject.date))
                    if (isTodayDateWOYear(dayValueObject.date) &&
                        isTodayStartTime(item.start_time) &&
                        isDateRange(item.start_date, item.end_date)) {
                        if (item.secure_all === 1) {
                            startBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                startBroadcast(securityItems)
                            })
                        }
                    }

                    if (isTodayDateWOYear(dayValueObject.date) &&
                        isTodayEndTime(item.end_time) &&
                        isDateRange(item.start_date, item.end_date)) {
                        if (item.secure_all === 1) {
                            stopBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                stopBroadcast(securityItems)
                            })
                        }

                    }
                })
                /** End of  Loop Yearly Value */
            });
        }catch(err){
            console.log("> GET YEARLY ERROR ::: ", err.message);
        }
        /** End of Yearly process */

         /**  Once a Year process */
        try{
            MODEL.getOnceAYear(function(err, result) {
                if (err) {
                    console.log(err)
                    return
                }
                /** Loop Yearly Value */
                result.forEach(function(item) {
                    const dayValueObject = JSON.parse(item.day_value)
                    if (testIfDateHasYear(TOOLS.getDayValue(dayValueObject.value)) && isTodayStartTime(item.start_time)) {
                        if (item.secure_all === 1) {
                            startBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                startBroadcast(securityItems)
                            })
                        }
                    }

                    // if (testIfDateHasYear(getDayValue(dayValueObject.value)) && isTodayEndTime(item.end_time)){
                    if(durationDay({day: TOOLS.getDayValue(dayValueObject.value), ending_day: item.ending_day}) && isTodayEndTime(item.end_time)){
                        // && parseInt(MOMENT().format("d")) === parseInt(item.ending_day)) {
                        console.log('> End once a year job')
                        if (item.secure_all === 1) {
                            stopBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                stopBroadcast(securityItems)
                            })
                        }

                    }
                })
                /** End of  Loop Yearly Value */
            });
        }catch(err){
            console.log("> GET ONCE A YEAR ERROR ::: ", err.message)
        }
        /** End of Once a Year process */

        /**  Day of Week in Month process */
        try{
            MODEL.getDaysOfWeekInMonth(function(err, result) {
                if (err) {
                    console.log(err)
                    return
                }
                /** Loop Yearly Value */
                result.forEach(function(item) {
                    const dayValueObject = JSON.parse(item.day_value)
                    if (testIfDateHasYear(TOOLS.getDayValue(dayValueObject.value)) && isTodayStartTime(item.start_time)) {
                        console.log('> Start day of week in month job')
                        if (item.secure_all === 1) {
                            startBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                startBroadcast(securityItems)
                            })
                        }
                    }

                    // if (testIfDateHasYear(getDayValue(dayValueObject.value)) && isTodayEndTime(item.end_time)
                    if(durationDay({day: TOOLS.getDayValue(dayValueObject.value), ending_day: item.ending_day}) && isTodayEndTime(item.end_time)){
                        // && parseInt(moment().format("d")) === parseInt(item.ending_day)) {
                        console.log('> End day of week in month job')
                        if (item.secure_all === 1) {
                            stopBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                stopBroadcast(securityItems)
                            })
                        }

                    }
                })
                /** End of  Loop Yearly Value */
            });
        }catch(err){
            console.log("> GET DAYS OF WEEK IN MONTH ERROR ::: ", err.message);
        }
        /** End of Day of Week in Month process */

        /** Same Date Each Year process */
        // MODEL.getSameDateEachYear(function(err, result) {
        //     if (err) {
        //         console.log(err)
        //         return
        //     }
        //     /** Loop Yearly Value */
        //     result.forEach(function(item) {
        //         const dayValueObject = JSON.parse(item.day_value)
        //         if (testIfDateHasYear(TOOLS.getDayValue(dayValueObject.value)) && isTodayStartTime(item.start_time)) {
        //             console.log('> Start same date each year job')
        //             if (item.secure_all === 1) {
        //                 startBroadcastAll(item.group_id)
        //             } else {
        //                 MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
        //                     if (err) {
        //                         console.log(err)
        //                         return
		// 					}
		// 					// stopBroadcastAll(item.group_id);
        //                     startBroadcast(securityItems)
        //                 })
        //             }
        //         }

        //         // if (testIfDateHasYear(getDayValue(dayValueObject.value)) && isTodayEndTime(item.end_time)) {
        //         if(durationDay({day: TOOLS.getDayValue(dayValueObject.value), ending_day: item.ending_day}) && isTodayEndTime(item.end_time)){
        //             console.log('> End same date each year job')
        //             if (item.secure_all === 1) {
        //                 stopBroadcastAll(item.group_id)
        //             } else {
        //                 MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
        //                     if (err) {
        //                         console.log(err)
        //                         return
		// 					}
		// 					// stopBroadcastAll(item.group_id);
        //                     stopBroadcast(securityItems)
        //                 })
        //             }

        //         }
        //     })
        //     /** End of  Loop Yearly Value */
        // })
        /** End of Same Date Each Year process */

        /** Days of Week */
        try{
            MODEL.getDaysofWeek(function(err, result) {
                if (err) {
                    return
                }
                /** Loop Days of Week Value */
                result.forEach(async function(item) {
                    const dayValueObject = JSON.parse(item.day_value);
                    if (TOOLS.isDayToday(TOOLS.getDayValue(dayValueObject.value)) && isTodayStartTime(item.start_time)) {
                        
                        await MODEL.updateStartDate(MOMENT().format("YYYY-MM-DD"), item.id);

                        if (item.secure_all === 1) {
                            startBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                startBroadcast(securityItems)
                            })
                        }
                    }

                    if (durationDay({day: TOOLS.getDayValue(dayValueObject.value), ending_day: item.ending_day, start_date: item.start_date}) && isTodayEndTime(item.end_time)) {
                        if (item.secure_all === 1) {
                            stopBroadcastAll(item.group_id)
                        } else {
                            MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                // stopBroadcastAll(item.group_id);
                                stopBroadcast(securityItems);
                            })
                        }
                    }
                })
                /** End Loop Days of Week Value */
            });
        }catch(err){
            console.log("> GET DAILY ERROR ::: ", err.message);
        }
        /** End of Days of Week */

        /** Occurence */
        // MODEL.getOccurence(function(err, result) {
        //     if (err) {
        //         console.log(err)
        //         return
        //     }
        //     /** Loop Occurence */
        //     result.forEach(function(item) {
        //         const dayValueObject = JSON.parse(item.day_value)
        //         const {
        //             day,
        //             month,
        //             occurence
        //         } = dayValueObject
        //         if (isSameDay(day) &&
        //             isSameMonth(month) &&
        //             isTodayStartTime(item.start_time) &&
        //             parseInt(occurence) > 0 &&
        //             isDateRange(item.start_date, item.end_date)) {
        //             console.log('> Start occurence job')
        //             if (item.secure_all === 1) {
        //                 startBroadcastAll(item.group_id)
        //             } else {
        //                 MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
        //                     if (err) {
        //                         console.log(err)
        //                         return
		// 					}
		// 					// stopBroadcastAll(item.group_id);
        //                     startBroadcast(securityItems)
        //                 })
        //             }
        //             MODEL.reduceOccurence(item, function(err, result) {

        //             })
        //         }

        //         if (isSameDay(day) &&
        //             isSameMonth(month) &&
        //             isTodayEndTime(item.end_time) &&
        //             isDateRange(item.start_date, item.end_date)) {
        //             console.log('> End occurence')
        //             if (item.secure_all === 1) {
        //                 stopBroadcastAll(item.group_id)
        //             } else {
        //                 MODEL_SECURITY.getByScheduleId(item.id, function(err, securityItems) {
        //                     if (err) {
        //                         console.log(err)
        //                         return
		// 					}
		// 					// stopBroadcastAll(item.group_id);
        //                     stopBroadcast(securityItems)
        //                 })
        //             }
        //         }
        //     })
        //     /** End of Loop Occurence */
        // })

        /** End of Occurence */
    }
}

function isTodayDate(date) {
    return MOMENT().format('Y-M-D') === MOMENT(date, ["YYYY-MM-DD"]).format('Y-M-D')
}

function isDateRange(startDate, endDate) {
    const range = MOMENT().range(startDate, MOMENT(endDate).add(1, 'days'))
    const today = MOMENT()
    return today.within(range)
}

const durationDay = (param) => {
    const { day, ending_day, start_date} = param;
    let date = MOMENT().format("Y-M-D");
    
    if(day && !Array.isArray(day)){
        date = MOMENT().day(MOMENT().format("ddd")).format("Y-M-D");
    }

    if(Array.isArray(day)){

        // date = day.slice(-1).pop();
        // date = MOMENT().day(date).format("Y-M-D");        
        // date = isValidDate(date) ? MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D") : "";
        date = MOMENT().format("ddd");
        if(TOOLS.isDayToday(day)){
            if(start_date){
                date = MOMENT(start_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            }else{
                date = MOMENT().format("Y-M-D");
            }
        }else{
            // if(day.length > 0 && day.length < 2){
            if(day.length > 0){
                
                // if(parseInt(ending_day) === 2){
                //     date = MOMENT().day(date).add(`-${ending_day-1}`, 'days').format("Y-M-D");
                // }else if(parseInt(ending_day) === 3){
                //     // date = MOMENT().day("-1", "days").add(`-${ending_day-1}`, 'days').format("Y-M-D");
                //     date = MOMENT().weekday(`-${ending_day-2}`).format("Y-M-D");
                // }else if(parseInt(ending_day) === 7){
                //     // date = MOMENT().day("-1", "days").add(`-${ending_day-1}`, 'days').format("Y-M-D");
                //     date = MOMENT().weekday(`-${ending_day}`).format("Y-M-D");
                // }else{
                //     date = MOMENT().day(day[0]).format("Y-M-D");
                // }

                if(parseInt(ending_day) > 1){
                    // date = MOMENT().weekday(`-${ending_day-2}`).format("Y-M-D");
                    // date = MOMENT(start_date, "YYYY-MM-DD").add(ending_day-1, "days").format("Y-M-D");
                    date = start_date;
                }else{
                    date = MOMENT().day(day[0]).format("Y-M-D");
                }
            }else{
                date = MOMENT().day(date).add('-1',"days").format("Y-M-D");
            }
        }
                
        // date = MOMENT().day(date).format("Y-M-D");
        date = isValidDate(date) ? MOMENT(date, ["YYYY-MM-DD"]).format("Y-M-D") : "";
        
        if(isValidDate(date) && isDuration(date, ending_day-1)){
            return isDuration(date, ending_day-1);
        }
        
        // return isDuration(date, ending_day-1);
    }else if (isValidDate(day) && isTodayDate(day)){
        return isDuration(date, ending_day-1);
    }else{

        if(isValidDate(day) && isDuration(day, ending_day-1)){
            return isDuration(day, ending_day-1);
        }else{
            
            if(parseInt(ending_day) === 3 || parseInt(ending_day) === 4){
                if(isTodayDate(date)){
                    return true;
                }
            }
            
            if(isValidDate(day) && isTodayDate(MOMENT(day, "Y-M-D").add(`-${parseInt(ending_day)}`, 'days').format("Y-M-D"))){
                // return isDuration(date, ending_day-1);
                return true;
            }else if(isValidDate(day) && isTodayDate(MOMENT(day, "Y-M-D").add(`${parseInt(ending_day)+1}`, 'days').format("Y-M-D"))){
                return true;
            }else{
                return false;
            }
        }
    }
}

const isDuration = (date, endingDate) =>{
    if(typeof date === "undefined" || !date){
        return false;
    }
    
    return MOMENT().format("Y-M-D") === MOMENT(date, ["YYYY-MM-DD"]).add(endingDate, 'days').format("Y-M-D");
}

const isValidDate = (date) =>{
    return MOMENT(date, ["YYYY-MM-DD"]).isValid();
}

function isTodayStartTime(time) {
    return MOMENT().format('HH:mm') === MOMENT(time, 'HH:mm:ss').format('HH:mm')
}

function isTodayEndTime(time) {
    if (time == null) {
        time = '24:00:00'
    }
    return MOMENT().format('HH:mm') === MOMENT(time, 'HH:mm:ss').format('HH:mm')
}

let isTodayDateYear = (date) =>{
    return MOMENT().format('Y-M-D') === MOMENT(date, ["YYYY-MM-DD"]).format('Y-M-D');
}

function isTodayDateWOYear(date) {
    return MOMENT().format('M-D') === MOMENT(date, ["YYYY-MM-DD"]).format('M-D')
}

let testIfDateHasYear = (date) =>{
    if(isValidDate(date)){
        return isTodayDateYear(date);
    }else{
        return isTodayDateWOYear(date);
    }
}

function isSameDay(day) {
    return MOMENT().format('ddd') === MOMENT(day, 'dddd').format('ddd')
}

function isSameMonth(month) {
    return MOMENT().format('M') === MOMENT(month, 'MMMM').format('M')
}

function getOccurence() {
    const days = MOMENT().format('DD')
    return Math.floor(days / 6)
}

function getWebsocketEndpoint() {
    return `ws://${process.env.APP_URL}:${process.env.APP_PORT}/socket`
}
let isSecure = {};
let validated = [];
let dataNew = {};
function startBroadcast(items) {
	const SOCKET_ENDPOINT = getWebsocketEndpoint()	
	// const WS = new WebSocket(SOCKET_ENDPOINT+'/server');
	
	// WS.onopen = () =>{
	// 	WS.onmessage = async (event) =>{
	// 		if(WS.readyState === 1){
	// 			await getData(event.data, items, WS);
	// 			// const validated = await validateSecurity(event.data, items, WS);
	// 		}
	// 		// console.log(validated);
	// 	}
	// }
	
    items.forEach(function(item) {
        const stringifyData = JSON.stringify({
            group: item.group_id,
            data: {
                "MessageType": "CarCallSecurity",
                "CarID": item.elevator_id,
                "Floor": item.floor_id,
                "Front/Rear": item.front_permission
            }
        });
        
        const unsecureallnew = newUnsecureAll(item.group_id, item.elevator_id);
		
		// WS.close();
		
		const CONNECTION = new WebSocket(SOCKET_ENDPOINT + '/control')

        CONNECTION.onopen = async () => {
			// if(Object.keys(dataNew) > 0){
			// 	await validateSecurity(items);
			// }
			CONNECTION.send(unsecureallnew);
            console.log('> Sending Broadcast ====>', stringifyData)
            setTimeout(() =>{
                CONNECTION.send(stringifyData)
            }, 300)
		}
	});

	// CONNECTION.close();
	// WS.close();
}

function stopBroadcast(items) {
	const SOCKET_ENDPOINT = getWebsocketEndpoint()

	// const WS = new WebSocket(SOCKET_ENDPOINT+'/server');

	// WS.onopen = () =>{
	// 	WS.onmessage = async (event) =>{
	// 		if(WS.readyState === 1){
	// 			await getData(event.data, items, WS);
	// 			// const validated = await validateSecurity(event.data, items, WS);
	// 		}
	// 		// console.log(validated);
	// 	}
	// }

    items.forEach(function(item) {
        const stringifyData = JSON.stringify({
            group: item.group_id,
            data: {
                "MessageType": "CarCallSecurity",
                "CarID": item.elevator_id,
                "Floor": item.floor_id,
                "Front/Rear": item.front_permission
            }
		});
		
		const CONNECTION = new WebSocket(SOCKET_ENDPOINT + '/control')
        const unsecureallnew = newUnsecureAll(item.group_id, item.elevator_id);
        CONNECTION.onopen = async () => {
			// if(Object.keys(dataNew) > 0){
			// 	await validateSecurity(items);
			// }
			CONNECTION.send(unsecureallnew);
            // setTimeout(()=>{
            //     CONNECTION.send(stringifyData)
            // }, 300)
        };
	});
	
	// CONNECTION.close();
	// WS.close();
}

const newUnsecureAll = (group_id, car_id) =>{
    const data = JSON.stringify({
        group: group_id,
        data: {
            "MessageType": "BatchParameterUpdate",
            "CarID": car_id,
            "Batch": [
                {
                    "Type": 32,
                    "Index": 8,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 9,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 10,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 11,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 12,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 13,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 14,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 15,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 16,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 17,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 18,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 19,
                    "Value": 4294967295
                },
                {
                    "Type": 32,
                    "Index": 20,
                    "Value": 4294967295
                }
            ]
        }
    });
    return data;
}

const getData = async (data, items, WS) => {
	data = JSON.parse(data);
	for(const item of items){
		if(data.MessageType === "Cars" && data.pi_group){
			if(item.group_id === data.pi_group){
				data = JSON.stringify(data.data);
				dataNew['data'] = data.data;
				WS.close();

				// await validateSecurity(data, items);
			}
		}
	}
};

const validateSecurity = async (data = null, items) =>{
	data = data || null;
	
	// console.log("DATA_NEW ::: ",data);

	if(data){
		data = JSON.parse(data.data);
		for(let item of items){
			if (data.MessageType === "Cars" && data.pi_group) {
				if(item.group_id === data.pi_group){
					// WS.close();
				}
				data = JSON.parse(data.data);
				//  validated = [...validated, await validateFloor(data["Cars"][item.elevator_id], item)];
			}
		}
		return validated;
	}
	
}

const validateFloor = async (data, item) =>{
	// if(data){
		var First33CallsFront = data["CarCallSecurityF0"];
		var Second33CallsFront = data["CarCallSecurityF1"];
		var Third33CallsFront = data["CarCallSecurityF2"];

		var First33CallsRear = data["CarCallSecurityR0"];
		var Second33CallsRear = data["CarCallSecurityR1"];
		var Third33CallsRear = data["CarCallSecurityR2"];
		
		let offset = 0;
		
		var latchedFront = 0;
		var latchedRear = 0;

		const i = item.floor_id;
		if (i < 32) {
			latchedFront = (parseInt((First33CallsFront) >> (i)) & 0x01);
			latchedRear = (parseInt((First33CallsRear) >> (i)) & 0x01);

		} else if (i < 64) {
			latchedFront = (parseInt((Second33CallsFront) >> (i - 32)) & 0x01);
			latchedRear = (parseInt((Second33CallsRear) >> (i - 32)) & 0x01);

		} else {
			latchedFront = (parseInt((Third33CallsFront) >> (i - 64)) & 0x01);
			latchedRear = (parseInt((Third33CallsRear) >> (i - 64)) & 0x01);
		}

		let frontButton = item.elevator_id;
		
		if (item.floor_id !== null && frontButton !== null && frontButton === 0 ) {
			if (latchedFront === 0) {
				isSecure = {...isSecure, "door": 0, "secure": true, "item": item};
			}else{
				isSecure = {...isSecure, "door": 0, "secure": false, "item": item};
			}
		}

		let rearButton = item.elevator_id;

		if (item.floor_id !== null && rearButton !== null && rearButton === 1) {
			if(latchedRear === 0) {
				isSecure = {...isSecure, "door": 1, "secure": true, "item": item};
			}else{
				isSecure = {...isSecure, "door": 1, "secure": false, "item": item};
			}
		}
		// console.log(JSON.stringify(isSecure))
		return JSON.stringify(isSecure);
	// }
}

function startBroadcastAll(group_id) {
    for (let i = 0; i < 8; i++) {
        const stringifyData = JSON.stringify({
            group: group_id,
            data: {
                "MessageType": "BatchParameterUpdate",
                "CarID": i,
                "Batch": [
                    // {"Type": 32, "Index": 8, "Value": 4294967295},
                    // {"Type": 32, "Index": 9, "Value": 4294967295},
                    // {"Type": 32, "Index": 10, "Value": 4294967295},
                    // {"Type": 32, "Index": 12, "Value": 4294967295},
                    // {"Type": 32, "Index": 13, "Value": 4294967295},
                    // {"Type": 32, "Index": 14, "Value": 4294967295},
                    // { "Type": 32, "Index": 15, "Value": 4294967295 },
                    // { "Type": 32, "Index": 16, "Value": 4294967295 },
                    // { "Type": 32, "Index": 17, "Value": 4294967295 },
                    // { "Type": 32, "Index": 18, "Value": 4294967295 },
                    // { "Type": 32, "Index": 19, "Value": 4294967295 },
                    // { "Type": 32, "Index": 20, "Value": 4294967295 }
                    {
                        "Type": 32,
                        "Index": 8,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 9,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 10,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 11,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 12,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 13,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 14,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 15,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 16,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 17,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 18,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 19,
                        "Value": 0
                    },
                    {
                        "Type": 32,
                        "Index": 20,
                        "Value": 0
                    }
                ]
            }
        })
        const SOCKET_ENDPOINT = getWebsocketEndpoint()
        const CONNECTION = new WebSocket(SOCKET_ENDPOINT + '/control')
        CONNECTION.onopen = () => {
            CONNECTION.send(stringifyData)
        }
    }
}

function stopBroadcastAll(group_id) {
    for (let i = 0; i < 8; i++) {
        const stringifyData = JSON.stringify({
            group: group_id,
            data: {
                "MessageType": "BatchParameterUpdate",
                "CarID": i,
                "Batch": [
                    // {"Type": 32, "Index": 8, "Value": 0},
                    // {"Type": 32, "Index": 9, "Value": 0},
                    // {"Type": 32, "Index": 10, "Value": 0},
                    // {"Type": 32, "Index": 12, "Value": 0},
                    // {"Type": 32, "Index": 13, "Value": 0},
                    // {"Type": 32, "Index": 14, "Value": 0},
                    // { "Type": 32, "Index": 15, "Value": 0 },
                    // { "Type": 32, "Index": 16, "Value": 0 },
                    // { "Type": 32, "Index": 17, "Value": 0 },
                    // { "Type": 32, "Index": 18, "Value": 0 },
                    // { "Type": 32, "Index": 19, "Value": 0 },
                    // { "Type": 32, "Index": 20, "Value": 0 }
                    {
                        "Type": 32,
                        "Index": 8,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 9,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 10,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 11,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 12,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 13,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 14,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 15,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 16,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 17,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 18,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 19,
                        "Value": 4294967295
                    },
                    {
                        "Type": 32,
                        "Index": 20,
                        "Value": 4294967295
                    }
                ]
            }
        })
        const SOCKET_ENDPOINT = getWebsocketEndpoint()
        const CONNECTION = new WebSocket(SOCKET_ENDPOINT + '/control')
        CONNECTION.onopen = () => {
            CONNECTION.send(stringifyData)
        }
    }
}