const TOOLS = require('../../../helpers/tools.js');

module.exports ={
    outgoing: async (DATA, GROUP_ID, UUID, remote_ws) =>{
        const {module = "", type = "", payload = "", car_id = ""} = DATA;
        var jsonObj = TOOLS.getRedisKeyValue("requests:" + GROUP_ID+ ":settings");
        let timezone = JSON.parse(jsonObj).timezone
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "carcalls-time":
                                try{										

                                    
                                    REPORTS_MODEL.carCallsTime(payload, (err, result) =>{
                                        if(result && !err){
                                            // result.forEach(element => {
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "faults-datatable":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "hallcalls-time":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "out-of-service":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "in-service-overview":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "program-events":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/ave-floor":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/ave-time":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/distribution-wait-time":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "wait-times/longest":
                                try{

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "create":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "show":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update-secure-status":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "get":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "create":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "show":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update-secure-status":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "get":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "update":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "validate":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "delete".toUpperCase():
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            case "security-schedules":
                                try{										

                                    
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

                                }catch(err){
                                    throw new Error(err.message);
                                }
                                break;
                            default:

                                break;
                        }
                        break;
                    case "control-settings":
                        switch(type){
                            case "GET".toLocaleUpperCase():
                                try{										

                                    
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
                                    

                                    return;

                                }catch(err){
                                    throw new Error(err.message);
                                }
                            break;
                            case "UPDATE".toLocaleUpperCase():
                                try{										

                                    
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
                                        

                                    return;
                                }catch(err){
                                    throw new Error(err.message);
                                }
                            break;
                        }
                        break;
                    default:

                        break;
                }
            }catch(err){

            }
        }else{

        }
    }
}