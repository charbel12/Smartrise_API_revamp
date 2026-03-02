const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'smartrise-api'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// ============================================================
// HTTP REQUEST METRICS
// ============================================================

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register]
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

const httpRequestSize = new client.Histogram({
  name: 'http_request_size_bytes',
  help: 'HTTP request size in bytes',
  labelNames: ['method', 'route'],
  buckets: [100, 1000, 10000, 100000, 1000000],
  registers: [register]
});

const httpResponseSize = new client.Histogram({
  name: 'http_response_size_bytes',
  help: 'HTTP response size in bytes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [100, 1000, 10000, 100000, 1000000],
  registers: [register]
});

// ============================================================
// DATABASE METRICS
// ============================================================

const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'table'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
  registers: [register]
});

const dbQueriesTotal = new client.Counter({
  name: 'db_queries_total',
  help: 'Total number of database queries',
  labelNames: ['operation', 'table', 'status'],
  registers: [register]
});

const dbConnectionsActive = new client.Gauge({
  name: 'db_connections_active',
  help: 'Number of active database connections',
  registers: [register]
});

const dbConnectionErrors = new client.Counter({
  name: 'db_connection_errors_total',
  help: 'Total number of database connection errors',
  registers: [register]
});

// ============================================================
// AUTHENTICATION & AUTHORIZATION METRICS
// ============================================================

const authAttemptsTotal = new client.Counter({
  name: 'auth_attempts_total',
  help: 'Total number of authentication attempts',
  labelNames: ['type', 'status'], // type: login, token, etc. | status: success, failure
  registers: [register]
});

const activeSessionsGauge = new client.Gauge({
  name: 'active_sessions_total',
  help: 'Number of active user sessions',
  registers: [register]
});

// ============================================================
// BUSINESS METRICS
// ============================================================

const groupsTotal = new client.Gauge({
  name: 'groups_total',
  help: 'Total number of groups in system',
  registers: [register]
});

const controlsExecuted = new client.Counter({
  name: 'controls_executed_total',
  help: 'Total number of control commands executed',
  labelNames: ['control_type', 'status'],
  registers: [register]
});

const faultsDetectedTotal = new client.Counter({
  name: 'faults_detected_total',
  help: 'Total number of faults detected',
  labelNames: ['fault_type', 'severity'],
  registers: [register]
});

const alarmsTriggeredTotal = new client.Counter({
  name: 'alarms_triggered_total',
  help: 'Total number of alarms triggered',
  labelNames: ['alarm_type', 'severity'],
  registers: [register]
});

const monitoredDevices = new client.Gauge({
  name: 'monitored_devices_total',
  help: 'Total number of monitored devices',
  registers: [register]
});

const deviceErrors = new client.Counter({
  name: 'device_errors_total',
  help: 'Total number of device errors',
  labelNames: ['device_type', 'error_type'],
  registers: [register]
});

// ============================================================
// ERROR METRICS
// ============================================================

const errorsTotal = new client.Counter({
  name: 'errors_total',
  help: 'Total number of errors by type',
  labelNames: ['type', 'route'],
  registers: [register]
});

const exceptionsCaught = new client.Counter({
  name: 'exceptions_caught_total',
  help: 'Total number of exceptions caught',
  labelNames: ['exception_type'],
  registers: [register]
});

// ============================================================
// WEBSOCKET METRICS
// ============================================================

const websocketConnectionsActive = new client.Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active websocket connections',
  labelNames: ['endpoint'],
  registers: [register]
});

const websocketMessagesTotal = new client.Counter({
  name: 'websocket_messages_total',
  help: 'Total number of websocket messages',
  labelNames: ['endpoint', 'direction'], // direction: in, out
  registers: [register]
});

// ============================================================
// CACHE METRICS
// ============================================================

const cacheHitsTotal = new client.Counter({
  name: 'cache_hits_total',
  help: 'Total number of cache hits',
  labelNames: ['cache_name'],
  registers: [register]
});

const cacheMissesTotal = new client.Counter({
  name: 'cache_misses_total',
  help: 'Total number of cache misses',
  labelNames: ['cache_name'],
  registers: [register]
});

const cacheSize = new client.Gauge({
  name: 'cache_size_bytes',
  help: 'Cache size in bytes',
  labelNames: ['cache_name'],
  registers: [register]
});

// ============================================================
// BUSINESS LOGIC METRICS
// ============================================================

const reportsGenerated = new client.Counter({
  name: 'reports_generated_total',
  help: 'Total number of reports generated',
  labelNames: ['report_type', 'status'],
  registers: [register]
});

const reportGenerationDuration = new client.Histogram({
  name: 'report_generation_duration_seconds',
  help: 'Time taken to generate reports',
  labelNames: ['report_type'],
  buckets: [0.5, 1, 2, 5, 10, 30, 60],
  registers: [register]
});

// ============================================================
// TASK SCHEDULER METRICS
// ============================================================

const cronJobsExecuted = new client.Counter({
  name: 'cron_jobs_executed_total',
  help: 'Total number of cron jobs executed',
  labelNames: ['job_name', 'status'],
  registers: [register]
});

const cronJobDuration = new client.Histogram({
  name: 'cron_job_duration_seconds',
  help: 'Duration of cron job execution',
  labelNames: ['job_name'],
  buckets: [0.1, 0.5, 1, 5, 10, 30, 60],
  registers: [register]
});

// ============================================================
// MIDDLEWARE TO RECORD METRICS
// ============================================================

/**
 * Middleware to track HTTP requests
 */
const httpMetricsMiddleware = (req, res, next) => {
  const start = Date.now();

  // Calculate request size
  const requestSize = JSON.stringify(req.body).length;
  
  // Override res.send and res.json to capture response
  const originalSend = res.send;
  const originalJson = res.json;
  let routeLabel = req.route?.path || req.path || 'unknown';

  res.send = function(data) {
    const duration = (Date.now() - start) / 1000;
    const responseSize = typeof data === 'string' ? data.length : JSON.stringify(data).length;
    
    httpRequestDuration.labels(req.method, routeLabel, res.statusCode).observe(duration);
    httpRequestsTotal.labels(req.method, routeLabel, res.statusCode).inc();
    httpRequestSize.labels(req.method, routeLabel).observe(requestSize);
    httpResponseSize.labels(req.method, routeLabel, res.statusCode).observe(responseSize);
    
    return originalSend.call(this, data);
  };

  res.json = function(data) {
    const duration = (Date.now() - start) / 1000;
    const responseSize = JSON.stringify(data).length;
    
    httpRequestDuration.labels(req.method, routeLabel, res.statusCode).observe(duration);
    httpRequestsTotal.labels(req.method, routeLabel, res.statusCode).inc();
    httpRequestSize.labels(req.method, routeLabel).observe(requestSize);
    httpResponseSize.labels(req.method, routeLabel, res.statusCode).observe(responseSize);
    
    return originalJson.call(this, data);
  };

  next();
};

/**
 * Record database operation
 */
const recordDbQuery = (operation, table, duration, status = 'success', error = null) => {
  dbQueryDuration.labels(operation, table).observe(duration / 1000); // Convert to seconds
  dbQueriesTotal.labels(operation, table, status).inc();
  if (error) {
    dbConnectionErrors.inc();
  }
};

/**
 * Record authentication attempt
 */
const recordAuthAttempt = (type, status) => {
  authAttemptsTotal.labels(type, status).inc();
};

/**
 * Record control execution
 */
const recordControlExecution = (controlType, status) => {
  controlsExecuted.labels(controlType, status).inc();
};

/**
 * Record fault detection
 */
const recordFaultDetection = (faultType, severity) => {
  faultsDetectedTotal.labels(faultType, severity).inc();
};

/**
 * Record alarm trigger
 */
const recordAlarmTrigger = (alarmType, severity) => {
  alarmsTriggeredTotal.labels(alarmType, severity).inc();
};

/**
 * Record error
 */
const recordError = (errorType, route) => {
  errorsTotal.labels(errorType, route).inc();
};

/**
 * Record websocket connection
 */
const recordWebsocketConnection = (endpoint, count) => {
  websocketConnectionsActive.labels(endpoint).set(count);
};

/**
 * Record websocket message
 */
const recordWebsocketMessage = (endpoint, direction) => {
  websocketMessagesTotal.labels(endpoint, direction).inc();
};

/**
 * Record cache hits/misses
 */
const recordCacheHit = (cacheName) => {
  cacheHitsTotal.labels(cacheName).inc();
};

const recordCacheMiss = (cacheName) => {
  cacheMissesTotal.labels(cacheName).inc();
};

/**
 * Record cache size
 */
const updateCacheSize = (cacheName, sizeBytes) => {
  cacheSize.labels(cacheName).set(sizeBytes);
};

/**
 * Record cron job execution
 */
const recordCronJob = (jobName, status, duration) => {
  cronJobsExecuted.labels(jobName, status).inc();
  cronJobDuration.labels(jobName).observe(duration / 1000); // Convert to seconds
};

/**
 * Record report generation
 */
const recordReportGeneration = (reportType, status, duration) => {
  reportsGenerated.labels(reportType, status).inc();
  reportGenerationDuration.labels(reportType).observe(duration / 1000); // Convert to seconds
};

/**
 * Update device metrics
 */
const updateMonitoredDevices = (count) => {
  monitoredDevices.set(count);
};

const recordDeviceError = (deviceType, errorType) => {
  deviceErrors.labels(deviceType, errorType).inc();
};

/**
 * Update active sessions
 */
const updateActiveSessions = (count) => {
  activeSessionsGauge.set(count);
};

/**
 * Update groups total
 */
const updateGroupsTotal = (count) => {
  groupsTotal.set(count);
};

module.exports = {
  // Metrics endpoint
  getMetrics: async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  },

  // Registry and client
  register,
  client,
  
  // Middleware
  httpMetricsMiddleware,
  
  // Recording functions
  recordDbQuery,
  recordAuthAttempt,
  recordControlExecution,
  recordFaultDetection,
  recordAlarmTrigger,
  recordError,
  recordWebsocketConnection,
  recordWebsocketMessage,
  recordCacheHit,
  recordCacheMiss,
  updateCacheSize,
  recordCronJob,
  recordReportGeneration,
  updateMonitoredDevices,
  recordDeviceError,
  updateActiveSessions,
  updateGroupsTotal,
  
  // Metrics for direct access if needed
  httpRequestDuration,
  httpRequestsTotal,
  httpRequestSize,
  httpResponseSize,
  dbQueryDuration,
  dbQueriesTotal,
  dbConnectionsActive,
  dbConnectionErrors,
  authAttemptsTotal,
  activeSessionsGauge,
  groupsTotal,
  controlsExecuted,
  faultsDetectedTotal,
  alarmsTriggeredTotal,
  monitoredDevices,
  deviceErrors,
  errorsTotal,
  exceptionsCaught,
  websocketConnectionsActive,
  websocketMessagesTotal,
  cacheHitsTotal,
  cacheMissesTotal,
  cacheSize,
  reportsGenerated,
  reportGenerationDuration,
  cronJobsExecuted,
  cronJobDuration
};
