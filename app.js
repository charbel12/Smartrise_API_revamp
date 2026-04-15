require('dotenv').config({});

const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.APP_PORT || 9300;
const expressWs = require('express-ws')(APP);
const cors = require('cors');
const fs = require('fs');

const groupProxy = require('./middlewares/groupProxy');

// Logger and Metrics
const Logger = require('./helpers/logger');
const { httpMetricsMiddleware, errorMetricsMiddleware } = require('./middlewares/metrics');
const appLogger = new Logger('APP');

const migrate = require("./database/migrate");
const seed = require("./database/seed");
const { sequelize } = require("./database/models");

(async () => {
  try {
    // Wait for DB connection
    let connected = false;
    let retries = 10;
    while (!connected && retries > 0) {
      try {
        await sequelize.authenticate();
        connected = true;
        appLogger.info("Database connection established");
      } catch (err) {
        retries--;
        appLogger.warn(`Database not ready, retrying... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    if (!connected) {
      throw new Error("Could not connect to database after multiple retries");
    }

    if (process.env.RUN_MIGRATIONS === "true") {
      appLogger.info("Running database migrations...");
      await migrate();
      appLogger.info("Migrations completed successfully");
    }

    if (process.env.RUN_SEEDS === "true") {
      appLogger.info("Running database seeds...");
      await seed();
      appLogger.info("Seeds completed successfully");
    }

  } catch (err) {
    appLogger.error("DB setup failed", err);
    process.exit(1);
  }
})();

// ----------------- CORS Setup -----------------
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-group-id'],
};

APP.use(cors(corsOptions));
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.use(httpMetricsMiddleware);

// Proxy middleware for handling remote group requests
APP.use(groupProxy);

// App Version
fs.readFile('./appversion.txt', 'utf8', (err, data) => {
  if (err) {
    appLogger.error('Failed to read app version file', err);
    return;
  }
  process.env.APP_VERSION = data.replace(/\n$/, "") || '1.0.0';
  appLogger.info(`App version loaded: ${process.env.APP_VERSION}`);
});

// Routes
// Root Route
APP.get("/", (req, res) => {
  appLogger.debug("Root route accessed");
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
APP.use('/permissions', loadController('./modules/permissions/controllers/index.js'));

// ALARMS
APP.use('/alarms', loadController('./modules/alarms/controllers/index.js'));

// REPORTS
APP.use('/reports', loadController('./modules/reports/controllers/index.js'));

// GROUPS
APP.use('/groups', loadController('./modules/groups/controllers/index.js'));

// TECHNICIAN
APP.use('/technician/parameters', loadController('./modules/technician/controllers/index.js'));
APP.use('/technician/io', loadController('./modules/technician/controllers/io.js'));

// SETTINGS LOGS
APP.use('/settings/logs', loadController('./modules/settings/controllers/logs.js'));

// SETTINGS RTC
APP.use('/settings/rtc', loadController('./modules/settings/controllers/rtc.js'));

// SETTINGS IO
APP.use('/settings/io', loadController('./modules/settings/controllers/io.js'));

// SETTINGS GROUP CONFIG
const SETTINGS_ROUTER = loadController('./modules/settings/controllers/group-config.js');
APP.use('/settings', SETTINGS_ROUTER);

// UPDATES
APP.use('/updates', loadController('./modules/updates/controllers/index.js'));

// BOOTLOADER
APP.use('/bootloader', loadController('./modules/bootloader/controllers/index.js'));

// MONITORING
APP.use('/', loadController('./modules/monitoring/routes.js'));

// ----------------- WEBSOCKETS -----------------
const SOCKET_SERVER = require('./modules/socket/controllers/server.js');
APP.ws('/socket/server', SOCKET_SERVER);

// ----------------- CONTROLS REST API -----------------
const REST_CONTROL = require('./modules/controls/controllers/rest-control.js');
APP.post('/control', REST_CONTROL);

const SOCKET_CONTROL = require('./modules/socket/controllers/control.js');
APP.ws('/socket/control', SOCKET_CONTROL);

// Initialize Socket Manager
try {
  const PiManager = require('./modules/socket/managers/PiManager.js');
  PiManager.init();
  appLogger.info("PiManager initialized successfully");
} catch (err) {
  appLogger.error("Failed to initialize PiManager", err);
}

// ----------------- ERROR HANDLING -----------------
// Error handling middleware (must be after all other middleware and routes)
APP.use(errorMetricsMiddleware);

const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');

// Global error handler
APP.use(globalErrorHandler);

// 404 handler
APP.use(notFoundHandler);

// ----------------- START SERVER -----------------
APP.listen(PORT, () => {
  appLogger.info(`Smartrise API v${process.env.APP_VERSION || '1.0.0'} listening on port ${PORT}!`);
  appLogger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  appLogger.info(`Metrics endpoint: http://localhost:${PORT}/metrics`);
});