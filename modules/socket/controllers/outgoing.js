const TOOLS = require('../../../helpers/tools.js');

module.exports ={
    outgoing: async (DATA, GROUP_ID, UUID, remote_ws) =>{
        const {module = "", type = "", payload = "", car_id = ""} = DATA;
        // //console.log('GROUP_ID', GROUP_ID)
        var jsonObj = TOOLS.getRedisKeyValue("requests:" + GROUP_ID+ ":settings");
        let timezone = JSON.parse(jsonObj).timezone
        // //console.log('timezone is: ',timezone)
        if(GROUP_ID){
            try{
                switch (module.toLowerCase()) {
                    case "faults":
                        if(type === "datatable"){
                            const FAULTS_MODEL =  require('../../faults/models/index.js');
                            try{

                                FAULTS_MODEL.datatables(GROUP_ID, car_id, payload, function(err, result){
                                    if(result && !err){
                                        if(remote_ws.readyState === 1){

                                            result.data = result.data.map(x =>{
                                                return {...x, timezone: TOOLS.getServerTimezone()};
                                            });

                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                        return;
                                    }else{
                                        throw new Error(err);
                                    }
                                });
                            }catch(err){
                                throw new Error(err.message);
                            }
                        }
                        if(type === "delete"){
                            const FAULTS_MODEL =  require('../../faults/models/index.js');
                            try{

                                FAULTS_MODEL.clearAll(GROUP_ID,function(err, result){
                                    if(result && !err){
                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                        return;
                                    }else{
                                        throw new Error(err)
                                    }
                                });
                            }catch(err){
                                throw new Error(err.message);
                            }
                        }

                        if(type === "faults-oldest-records"){
                            try{										
                                const FAULTS_MODEL =  require('../../faults/models/index.js');
                                FAULTS_MODEL.getOldestFaults(function(err, result){
                                    if(result && !err){
                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                        return;
                                    }else{
                                        if(err){
                                            throw new Error(err);
                                        }
                                    }
                                });
                            }catch(err){
                                throw new Error(err.message);
                            }
                        }
                        break;
                    case "alarms":
                        if(type === "datatable"){
                            const ALARMS_MODEL =  require('../../alarms/models/index.js');
                            try{

                                ALARMS_MODEL.datatables(GROUP_ID, car_id, payload, function(err, result){
                                    if(result && !err){
                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.

                                            result.data = result.data.map(x =>{
                                                return {...x, timezone: TOOLS.getServerTimezone()};
                                            });

                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }

                                        return;
                                    }else{
                                        throw new Error(err);
                                    }
                                });
                            }catch(err){
                                throw new Error(err.message);
                            }
                        }

                        if(type === "delete"){
                            const ALARMS_MODEL =  require('../../alarms/models/index.js');
                            try{

                                ALARMS_MODEL.clearAll(function(err, result){
                                    if(result && !err){

                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                        return;
                                    }else{
                                        throw new Error(err);
                                    }
                                });
                            }catch(err){
                                throw new Error(err.message);
                            }
                        }
                        
                        break;
                    case "reports":

                        const REPORTS_MODEL =  require('../../reports/models/index.js');
                        const FAULTS_MODEL =  require('../../faults/models/index.js');
                        const ALARMS_MODEL =  require('../../alarms/models/index.js');
                                    
                        switch (type.toLowerCase()) {
                            case "carcalls-floor":
                                try{										
                                    
                                    REPORTS_MODEL.carCallsFloor(payload, (err, result) =>{
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END CAR CALLS BY FLOORS **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "carcalls-time":
                                try{										
                                    //console.log("********** BEGIN CAR CALLS BY TIME **********");
                                    
                                    REPORTS_MODEL.carCallsTime(payload, (err, result) =>{
                                        // //console.log('previous result',result)
                                        if(result && !err){
                                            // result.forEach(element => {
                                            //     //console.log('type: ',typeof(element.date_created))
                                            //     element.date_created = moment(element.date_created).tz('America/Chicago').format('MM/DD/YYYY HH:mm:ss')
                                            // });
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    timezone: timezone,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "car-use":
                                try{										
                                    
                                    REPORTS_MODEL.carUse(payload, (err, result) =>{
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    timezone: timezone,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "door-times":
                                try{										
                                    REPORTS_MODEL.doorTimes(payload, (err, result) =>{
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END DOOR TIMES **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "faults-datatable":
                                try{										
                                    //console.log("********** BEGIN FAULTS / ALARMS DEFINITION **********");
                                    
                                    FAULTS_MODEL.all(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "faults-definition":
                                try{										
                                    
                                    FAULTS_MODEL.get(payload.id, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result[0],
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "alarms-datatable":
                                try{										
                                    
                                    ALARMS_MODEL.all(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    timezone: timezone,
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "alarms-definition":
                                try{										
                                    
                                    ALARMS_MODEL.get(payload.id, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result[0],
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "fault-history":
                                try{										
                                    
                                    REPORTS_MODEL.faultHistory(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                
                                                result.data = result.data.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });

                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "alarm-history":
                                try{										
                                    
                                    REPORTS_MODEL.alarmHistory(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.

                                                result.data = result.data.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });

                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "fault-summary":
                                try{										
                                    
                                    REPORTS_MODEL.faultSummary(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "floor-to-floor":
                                try{										
                                    
                                    REPORTS_MODEL.floorToFloor(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "hallcalls-floor":
                                try{										
                                    //console.log("********** BEGIN HALL CALLS BY FLOOR **********");
                                    
                                    REPORTS_MODEL.hallCallsFloor(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    timezone: timezone,
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END HALL CALLS BY FLOOR **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "hallcalls-time":
                                try{										
                                    //console.log("********** BEGIN HALL CALLS BY TIME OF DAY **********");
                                    
                                    REPORTS_MODEL.hallCallsTime(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END HALL CALLS BY TIME OF DAY **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "out-of-service":
                                try{										
                                    //console.log("********** BEGIN OUT OF SERVICE **********");
                                    
                                    REPORTS_MODEL.outOfService(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.

                                                result.data = result.data.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });

                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END OUT OF SERVICE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "in-service-overview":
                                try{
                                    //console.log("********** BEGIN IN SERVICE OVERVIEW **********");
                                    
                                    REPORTS_MODEL.inServiceOverview(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.

                                                result = result.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });
                                                
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END IN SERVICE OVERVIEW **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "program-events":
                                try{
                                    //console.log("********** BEGIN PROGRAM EVENTS **********");
                                    
                                    REPORTS_MODEL.programEvents(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.

                                                result.data = result.data.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });

                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END PROGRAM EVENTS **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/ave-floor":
                                try{
                                    //console.log("********** BEGIN WAIT TIMES - AVERAGE BY FLOOR **********");
                                    
                                    REPORTS_MODEL.waitTimeAveTimeFloor(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END WAIT TIMES - AVERAGE BY FLOOR **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/ave-time":
                                try{
                                    //console.log("********** BEGIN WAIT TIMES - AVERAGE BY TIME OF DAY **********");
                                    
                                    REPORTS_MODEL.waitTimeAveTimeDay(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    timezone: timezone,
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END WAIT TIMES - AVERAGE BY TIME OF DAY **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/distribution-wait-time":
                                try{
                                    //console.log("********** BEGIN WAIT TIMES - DISTRIBUTION BY WAIT TIME **********");
                                    
                                    REPORTS_MODEL.waitTime(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    timezone: timezone,
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END WAIT TIMES - DISTRIBUTION BY WAIT TIME **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/longest":
                                try{
                                    //console.log("********** BEGIN WAIT TIMES - LONGEST **********");
                                    
                                    REPORTS_MODEL.waitTimesLongest(payload, function(err, result){
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.

                                                result.data = result.data.map(x =>{
                                                    return {...x, timezone: TOOLS.getServerTimezone()};
                                                });

                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    timezone: timezone,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END WAIT TIMES - LONGEST **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                    case "scheduler":
                        switch(type.toLowerCase()){
                            case "datatable":
                                try{										
                                    //console.log("********** BEGIN SCHEDULER DATATABLE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.datatables(payload, (err, result) =>{

                                        if(result && !err){										
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SCHEDULER DATATABLE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "create":
                                try{										
                                    //console.log("********** BEGIN CREATE SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    let data = {data: payload}

                                    SCHEDULER_MODEL.create(data, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END CREATE SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "show":
                                try{										
                                    //console.log("********** BEGIN SHOW SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.get(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SHOW SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update-secure-status":
                                try{										
                                    //console.log("********** BEGIN SHOW SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    const SECURITY_MODEL =  require('../../security/models/index.js');
                                    
                                    const isSecure = (payload.isSecure === 'true') ? 1 : 0
                                    const defaults = {
                                        data : {
                                            secure_all: isSecure,
                                            group_id: GROUP_ID
                                        }
                                    }
                                    if(isSecure === 0 ) {
                                        SECURITY_MODEL.deleteByScheduleId(payload.id, function(err, result) {
                                            if(err){
                                                //console.log(err)
                                            }
                                        })
                                    }
                                    SCHEDULER_MODEL.update(payload.id, defaults, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SHOW SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "get":
                                try{										
                                    //console.log("********** BEGIN GET SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');

                                    SCHEDULER_MODEL.get(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END GET SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update":
                                try{										
                                    //console.log("********** BEGIN UPDATE SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    let data = {data: payload};
                                    
                                    SCHEDULER_MODEL.update(payload.id, data, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END UPDATE SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete":
                                try{										
                                    //console.log("********** BEGIN DELETE SCHEDULE **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.delete(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END DELETE SCHEDULE **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                        }
                        break;
                    case "scheduler-v2":
                        switch(type.toLowerCase()){
                            case "datatable":
                                try{										
                                    //console.log("********** BEGIN SCHEDULER DATATABLE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.datatablesV2(payload, (err, result) =>{

                                        if(result && !err){										
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }

                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SCHEDULER DATATABLE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "create":
                                try{										
                                    //console.log("********** BEGIN CREATE SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    let data = {data: payload}

                                    SCHEDULER_MODEL.createV2(data, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END CREATE SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "show":
                                try{										
                                    //console.log("********** BEGIN SHOW SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.getV2(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SHOW SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update-secure-status":
                                try{										
                                    //console.log("********** BEGIN UPDATE SECURE STATUS SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    const SECURITY_MODEL =  require('../../security/models/index.js');
                                    
                                    const isSecure = payload.isSecure ? 1 : 0
                                    const defaults = {
                                        data : {
                                            secure_all: isSecure,
                                            group_id: GROUP_ID
                                        }
                                    }
                                    if(isSecure === 0 ) {
                                        SECURITY_MODEL.deleteByScheduleId(payload.id, GROUP_ID, function(err, result) {
                                            if(err){
                                                //console.log(err)
                                            }
                                        })
                                    }
                                    SCHEDULER_MODEL.update(payload.id, defaults, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END UPDATE SECURE STATUS SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "get":
                                try{										
                                    //console.log("********** BEGIN GET SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');

                                    SCHEDULER_MODEL.getV2(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END GET SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update":
                                try{										
                                    //console.log("********** BEGIN UPDATE SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    let data = {data: payload};
                                    
                                    SCHEDULER_MODEL.updateV2(payload.id, data, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END UPDATE SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete":
                                try{										
                                    //console.log("********** BEGIN DELETE SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');
                                    
                                    SCHEDULER_MODEL.delete(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END DELETE SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "validate":
                                try{										
                                    //console.log("********** BEGIN VALIDATE SCHEDULE V2 **********");
                                    
                                    const SCHEDULER_MODEL =  require('../../schedules/models/index.js');

                                    let key;
                                    let value;

                                    if(typeof payload.validate === "undefined"){
                                        throw new Error("Invalid parameter!");
                                    }

                                    if(payload.validate.key === "name"){
                                        key = payload.validate.key;
                                        value = payload.validate.value;
                                    }else if (payload.validate.key === "date_time"){
                                        key = "start_time";
                                        value = payload.validate.value;
                                    }else{
                                        throw new Error("Invalid parameter!");
                                    }

                                    let param = {
                                        key, value
                                    }

                                    if(typeof payload.validate.schedule_id === "undefined"){
                                        delete param.schedule_id
                                    }else{
                                        param.schedule_id = payload.validate.schedule_id;
                                    }

                                    if(typeof payload.validate.date === "undefined"){
                                        delete param.date;
                                    }else{
                                        param.date = payload.validate.date;
                                    }
                                    
                                    SCHEDULER_MODEL.validate(param, (err, result) =>{
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{	
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END VALIDATE SCHEDULE V2 **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                        }
                        break;
                    case "security":
                        switch (type) {
                            case "post".toUpperCase():
                                try{										
                                    //console.log("********** BEGIN CREATE SECURITY **********");
                                    
                                    const SECURITY_MODEL =  require('../../security/models/index.js');
                                    
                                    SECURITY_MODEL.create(payload, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END CREATE SECURITY **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete".toUpperCase():
                                try{										
                                    //console.log("********** BEGIN DELETE SECURITY **********");
                                    
                                    const SECURITY_MODEL =  require('../../security/models/index.js');
                                    
                                    SECURITY_MODEL.delete(payload, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END DELETE SECURITY **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "security-schedules":
                                try{										
                                    //console.log("********** BEGIN SECURITY SCHEDULES **********");
                                    
                                    const SECURITY_MODEL =  require('../../security/models/index.js');
                                    
                                    SECURITY_MODEL.getByScheduleId(payload.id, (err, result) =>{
                                        
                                        if(result && !err){
                                            if(remote_ws.readyState === 1){
                                                // Send the data of API to Socket.
                                                remote_ws.send(JSON.stringify({
                                                    GroupID: GROUP_ID,
                                                    SiteID: process.env.SITE_ID,
                                                    CarID: car_id,
                                                    MessageType: 'API',
                                                    Module: module,
                                                    Type: type.toLowerCase(),
                                                    data: result,
                                                    uuid: UUID
                                                }));
                                            }
    
                                            return;
                                        }else{
                                            throw new Error(err);
                                        }
                                    });
                                    //console.log("********** END SECURITY SCHEDULES **********");
                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            default:
                                //console.log("Security method not recognized!");
                                break;
                        }
                        break;
                    case "control-settings":
                        switch(type){
                            case "GET".toLocaleUpperCase():
                                try{										
                                    //console.log("********** BEGIN GET CONTROL SETTINGS **********");
                                    
                                    const CONTROLS_MODEL =  require('../../controls/models/index.js');

                                    if(!payload) throw new Error('Missing payload!');
                                    
                                    const result = await CONTROLS_MODEL.get(JSON.parse(payload));
                                    
                                    if(!result) throw new Error("Something went wrong!");

                                    if(result){
                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                    }
                                    
                                    //console.log("********** END GET CONTROL SETTINGS **********");
                                    return;

                                }catch(err){
                                    throw new Error(err.message);
                                }
                            break;
                            case "UPDATE".toLocaleUpperCase():
                                try{										
                                    //console.log("********** BEGIN UPDATE CONTROL SETTINGS **********");
                                    
                                    const CONTROLS_MODEL =  require('../../controls/models/index.js');
                                    
                                    if(!payload || typeof payload === "undefined" || Object.keys(payload).length <= 0) throw new Error('Missing payload!');
                                    
                                    const payloads= {
                                        name: JSON.parse(payload).name,
                                        value: JSON.parse(payload).value,
                                        group_id: GROUP_ID,
                                        car_id,
                                    }

                                    const params = {
                                        name: JSON.parse(payload).name,
                                        group_id: GROUP_ID,
                                        car_id,
                                    }
                                    
                                    const result = await CONTROLS_MODEL.update(payloads, params)
                                      
                                    if(!result) throw new Error("Something went wrong!");

                                    if(result){
                                        if(remote_ws.readyState === 1){
                                            // Send the data of API to Socket.
                                            remote_ws.send(JSON.stringify({
                                                GroupID: GROUP_ID,
                                                SiteID: process.env.SITE_ID,
                                                CarID: car_id,
                                                MessageType: 'API',
                                                Module: module,
                                                Type: type.toLowerCase(),
                                                data: result,
                                                uuid: UUID
                                            }));
                                        }
                                    }
                                        
                                    //console.log("********** END UPDATE CONTROL SETTINGS **********");
                                    return;
                                }catch(err){
                                    throw new Error(err.message);
                                }
                            break;
                        }
                        break;
                    default:
                        console.log("Module not recognized!");
                        break;
                }
            }catch(err){
                console.log("> CATCH ERROR ::: ", err.message);
            }
        }else{
            console.log("Missing GROUP ID!");
        }
    }
}