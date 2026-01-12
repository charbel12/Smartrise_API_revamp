require('dotenv').config({});

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.APP_PORT || 9300;
const expressWs = require('express-ws')(APP);
const cors = require('cors');
const fs = require('fs');

// ----------------- CORS Setup -----------------
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

APP.use(cors(corsOptions));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

// ----------------- App Version -----------------
fs.readFile('./appversion.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process.env.APP_VERSION = data.replace(/\n$/, "") || '1.0.0';
});

// ----------------- Root Route -----------------
APP.get("/", (req, res) => {
    res.send("Smartrise API Version: " + process.env.APP_VERSION || '1.0.0');
});

// ----------------- ROUTES -----------------

// Helper function to load controllers using Express Router
const loadController = (path) => {
    const router = require(path);
    return router;
};

// CONTROLS
APP.use('/controls', loadController('./modules/controls/controllers/index.js'));

// FAULTS
APP.use('/faults', loadController('./modules/faults/controllers/index.js'));

// AUTH
APP.use('/auth', loadController('./modules/auth/controllers/index.js'));

// USERS
APP.use('/users', loadController('./modules/users/controllers/index.js'));

// ROLES
APP.use('/roles', loadController('./modules/roles/controllers/index.js'));
APP.use('/permissions', loadController('./modules/roles/controllers/index.js'));

// ALARMS
APP.use('/alarms', loadController('./modules/alarms/controllers/index.js'));

// REPORTS
APP.use('/reports', loadController('./modules/reports/controllers/index.js'));

// GROUPS
APP.use('/groups', loadController('./modules/groups/controllers/index.js'));

// SETTINGS LOGS
APP.use('/settings/logs', loadController('./modules/settings/controllers/logs.js'));

// SETTINGS RTC
APP.use('/settings/rtc', loadController('./modules/settings/controllers/rtc.js'));

// SETTINGS IO
APP.use('/settings/io', loadController('./modules/settings/controllers/io.js'));

// SETTINGS GROUP CONFIG
const SETTINGS_GROUPCONFIG = loadController('./modules/settings/controllers/group-config.js');
APP.use('/settings/reset-default', SETTINGS_GROUPCONFIG);
APP.use('/settings/group-config', SETTINGS_GROUPCONFIG);
APP.use('/settings/pi-config', SETTINGS_GROUPCONFIG);
APP.use('/settings/other-config', SETTINGS_GROUPCONFIG);
APP.use('/settings/network-config', SETTINGS_GROUPCONFIG);
APP.use('/settings/special-feature', SETTINGS_GROUPCONFIG);

// ----------------- WEBSOCKETS -----------------
const SOCKET_SERVER = require('./modules/socket/controllers/server.js');
APP.ws('/socket/server', SOCKET_SERVER);

const SOCKET_CONTROL = require('./modules/socket/controllers/control.js');
APP.ws('/socket/control', SOCKET_CONTROL);

// ----------------- START SERVER -----------------
APP.listen(PORT, () => console.log(`app listening on port ${PORT}!`));