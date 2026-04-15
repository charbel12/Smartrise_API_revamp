const VARS = require('../vars.js');
const EXPRESS = require('express');
const APP = EXPRESS();
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
const { exec } = require("child_process");
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const PI_MANAGER = require('../../socket/managers/PiManager.js');

ROUTER_MIDDLEWARE.USE_AUTHENTICATED(APP);

const PI_CONFIG = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];

const TIMEZONES = {
    "Pacific": "America/Los_Angeles",
    "Central": "America/Chicago",
    "Eastern": "America/New_York",
    "Mountain": "America/Denver",
    "Eastern European": "Asia/Beirut",
    "UTC": "UTC"
};

// GET current status
APP.get('/:groupID', async function (req, res) {
    try {
        const timezoneDescription = await TOOLS.getRedisKeyValue('timezone') || 'Central';
        
        // Find if it's a city or a description
        let selectedZone = "Central";
        for (const [desc, city] of Object.entries(TIMEZONES)) {
            if (city === timezoneDescription || desc === timezoneDescription) {
                selectedZone = desc;
                break;
            }
        }

        const now = moment();
        res.json({
            success: true,
            data: {
                timestamp: now.unix(),
                formattedTime: now.format("HH:mm"),
                formattedDate: now.format("MM / DD / YYYY"),
                timezone: selectedZone,
                availableTimezones: Object.keys(TIMEZONES),
                components: {
                    year: now.year(),
                    month: now.month() + 1,
                    day: now.date(),
                    hour: now.hour(),
                    minute: now.minute()
                }
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// SAVE new time/date
APP.post('/:groupID/save', async function (req, res) {
    const { day, month, year, hour, minute, timezone } = req.body;
    const groupID = req.params.groupID;

    if (!day || !month || !year || !hour === undefined || minute === undefined || !timezone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const fullTimezone = TIMEZONES[timezone] || timezone;
        
        // 1. Update Redis
        await TOOLS.setRedisKeyValue('timezone', fullTimezone);

        // 2. Prepare timestamp
        const dateArr = [parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)];
        const newTime = moment.utc(dateArr);

        if (!newTime.isValid()) {
            return res.status(400).json({ success: false, message: "Invalid date/time provided" });
        }

        // 3. Broadcast to all PIs via WebSocket
        const wsObject = {
            MessageType: "UpdateTime",
            time: newTime.unix(),
            day,
            month,
            year,
            hour,
            minute,
            timezone,
            dst: moment().isDST()
        };
        
        const socketServer = require('../../socket/controllers/server.js');
        socketServer.broadcast(wsObject);

        // 4. System-level time update
        // We'll run the system script. Since we're in a container, we assume the script is accessible
        // or we use a mechanism to trigger it. Based on user feedback, we intro this logic here.
        const setTimeCommand = `sudo date -s "${year}-${month}-${day} ${hour}:${minute}:00"`;
        exec(setTimeCommand, (err) => {
            if (err) console.error("Error setting system time:", err);
        });

        // Trigger the postgresql timezone update if script exists
        const psqlScript = "/home/pi/dockerui/sh/set_pi_psql_timezone.sh";
        if (fs.existsSync(psqlScript)) {
            exec(`sudo bash ${psqlScript}`, (err) => {
                if (err) console.error("Error setting psql timezone:", err);
            });
        }

        res.json({ success: true, message: "Time updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// RESTART services
APP.post('/:groupID/restart', function (req, res) {
    const groupID = req.params.groupID;
    
    // Logic to restart containers. 
    // Usually involves a shell command to docker-compose or a specialized script.
    const restartCommand = "sudo docker restart smartrise_api_dev c4_middleware";
    
    exec(restartCommand, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to restart services", error: stderr });
        }
        res.json({ success: true, message: "Services are restarting..." });
    });
});

module.exports = APP;