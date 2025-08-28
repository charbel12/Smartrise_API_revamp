require('dotenv').config({});

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.APP_PORT;
var expressWs = require('express-ws')(APP);
var cors = require('cors')
const UPDATE_FAULTS_OR_ALARMS = require('../SMARTRISE_API/helpers/updateFaultsAlarms.js');
const fs = require('fs')

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

APP.use(cors(corsOptions));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));


APP.use(cors({
    origin: '*'
}));

fs.readFile('./appversion.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    process.env.APP_VERSION = data.replace(/\n$/, "")
})

// UPDATE_FAULTS_OR_ALARMS.update_file_from_pi('faults');
// UPDATE_FAULTS_OR_ALARMS.update_file_from_pi('alarms');


APP.get("/", function(req, res) {
    res.send("Smartrise API Version: " + process.env.APP_VERSION);
});

const CONTROLS = require('./modules/controls/controllers/index.js');
APP.all('/controls/*', CONTROLS);

const FAULT = require('./modules/faults/controllers/index.js');
APP.all('/faults/*', FAULT);
APP.all('/faults', FAULT);

const AUTH = require('./modules/auth/controllers/index.js');
APP.all('/auth/*', AUTH);
APP.all('/auth', AUTH);

const USERS = require('./modules/users/controllers/index.js');
APP.all('/users/*', USERS);
APP.all('/users', USERS);

const ROLES = require('./modules/roles/controllers/index');
APP.all('/roles/*', ROLES);
APP.all('/roles', ROLES);
APP.all('/permissions', ROLES);

const ALARMS = require('./modules/alarms/controllers/index.js');
APP.all('/alarms/*', ALARMS);
APP.all('/alarms', ALARMS);

// const SECURITY = require('./modules/security/controllers/index.js');
// APP.all('/security/*', SECURITY);
// APP.all('/security', SECURITY);

// const DYNAMIC_SECURITY = require('./modules/dynamic-security/controllers/index.js');
// APP.all('/dynamic-security/*', DYNAMIC_SECURITY);
// APP.all('/dynamic-security', DYNAMIC_SECURITY);

// const REPORTS = require('./modules/reports/controllers/index.js');
// APP.all('/reports/*', REPORTS);
// APP.all('/reports', REPORTS);

const GROUPS = require('./modules/groups/controllers/index.js');
APP.all('/groups/*', GROUPS);
APP.all('/groups', GROUPS);

// const MANAGE = require('./modules/manage/controllers/index.js');
// APP.all('/manage/*', MANAGE);
// APP.all('/manage', MANAGE);

// const SETTINGS_LOGS = require('./modules/settings/controllers/logs.js');
// APP.all('/settings/logs/*', SETTINGS_LOGS);
// APP.all('/settings/logs', SETTINGS_LOGS);

// const SETTINGS_RTC = require('./modules/settings/controllers/rtc.js');
// APP.all('/settings/rtc/*', SETTINGS_RTC);
// APP.all('/settings/rtc', SETTINGS_RTC);

// const SETTINGS_IO = require('./modules/settings/controllers/io.js');
// APP.all('/settings/io/*', SETTINGS_IO);
// APP.all('/settings/io', SETTINGS_IO);

// const SETTINGS_GROUPCONFIG = require('./modules/settings/controllers/group-config.js');
// APP.all('/settings/reset-default/*', SETTINGS_GROUPCONFIG);
// APP.all('/settings/reset-default', SETTINGS_GROUPCONFIG);

// APP.all('/settings/group-config/*', SETTINGS_GROUPCONFIG);
// APP.all('/settings/group-config', SETTINGS_GROUPCONFIG);

// APP.all('/settings/pi-config/*', SETTINGS_GROUPCONFIG);
// APP.all('/settings/pi-config', SETTINGS_GROUPCONFIG);

// APP.all('/settings/other-config/*', SETTINGS_GROUPCONFIG);
// APP.all('/settings/other-config', SETTINGS_GROUPCONFIG);

// APP.all('/settings/network-config/*', SETTINGS_GROUPCONFIG);
// APP.all('/settings/network-config', SETTINGS_GROUPCONFIG);

// APP.all('/settings/special-feature', SETTINGS_GROUPCONFIG);

// const SCHEDULES = require('./modules/schedules/controllers/index.js');
// APP.all('/schedules/*', SCHEDULES);
// APP.all('/schedules', SCHEDULES);

// const DEVICES = require('./modules/viewing-devices/controllers/index.js');
// APP.all('/viewing-devices/*', DEVICES);
// APP.all('/viewing-devices', DEVICES);
// APP.all('/users/viewing-devices/users', DEVICES);

// const INSTALLATION = require('./modules/installation/controllers/index.js');
// APP.all('/installation', INSTALLATION);

// //WEBSOCKET FOR REALTIME COMMS
// const SOCKET_SERVER = require('./modules/socket/controllers/server.js');
// APP.ws(`/socket/server`, SOCKET_SERVER);

// //WEBSOCKET FOR REALTIME COMMS
// const SOCKET_CONTROL = require('./modules/socket/controllers/control.js');
// APP.ws(`/socket/control`, SOCKET_CONTROL);

// const CRON = require('./helpers/cron.js');
// CRON.start()

// require('./modules/socket/controllers/listener.js')();

// require('./documentation/swagger.js')(APP); //swagger endpoint. remove for productions

APP.listen(PORT, () => console.log(`app listening on port ${PORT}!`));