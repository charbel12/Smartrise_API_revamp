const metricsController = require('../modules/monitoring/controllers/metrics');
const Logger = require('../helpers/logger');

const logger = new Logger('HTTP_MIDDLEWARE');

/**
 * HTTP Metrics Middleware
 * Tracks request metrics including duration, size, and response codes
 */
const httpMetricsMiddleware = (req, res, next) => {
  const start = Date.now();
  const startMemory = process.memoryUsage().heapUsed;

  // Calculate request size from body
  let requestSize = 0;
  if (req.body) {
    try {
      requestSize = JSON.stringify(req.body).length;
    } catch (e) {
      requestSize = 0;
    }
  }

  // Store original response methods
  const originalSend = res.send;
  const originalJson = res.json;
  const originalStatus = res.status;

  let statusCode = 200;
  let routeLabel = req.route?.path || req.path || 'unknown';

  // Override status method
  res.status = function(code) {
    statusCode = code;
    return originalStatus.call(this, code);
  };

  // Override send method
  res.send = function(data) {
    const duration = Date.now() - start;
    const endMemory = process.memoryUsage().heapUsed;
    const memoryDelta = endMemory - startMemory;

    let responseSize = 0;
    if (data) {
      responseSize = typeof data === 'string' ? data.length : JSON.stringify(data).length;
    }

    // Record metrics
    metricsController.httpRequestDuration.labels(req.method, routeLabel, statusCode).observe(duration / 1000);
    metricsController.httpRequestsTotal.labels(req.method, routeLabel, statusCode).inc();
    metricsController.httpRequestSize.labels(req.method, routeLabel).observe(requestSize);
    metricsController.httpResponseSize.labels(req.method, routeLabel, statusCode).observe(responseSize);

    // Log the request
    if (statusCode >= 400) {
      logger.warn(`${req.method} ${req.path} -> ${statusCode} (${duration}ms)`);
    } else {
      logger.debug(`${req.method} ${req.path} -> ${statusCode} (${duration}ms)`);
    }

    return originalSend.call(this, data);
  };

  // Override json method
  res.json = function(data) {
    const duration = Date.now() - start;
    const endMemory = process.memoryUsage().heapUsed;
    const memoryDelta = endMemory - startMemory;

    let responseSize = 0;
    if (data) {
      try {
        responseSize = JSON.stringify(data).length;
      } catch (e) {
        responseSize = 0;
      }
    }

    // Record metrics
    metricsController.httpRequestDuration.labels(req.method, routeLabel, statusCode).observe(duration / 1000);
    metricsController.httpRequestsTotal.labels(req.method, routeLabel, statusCode).inc();
    metricsController.httpRequestSize.labels(req.method, routeLabel).observe(requestSize);
    metricsController.httpResponseSize.labels(req.method, routeLabel, statusCode).observe(responseSize);

    // Log the request
    if (statusCode >= 400) {
      logger.warn(`${req.method} ${req.path} -> ${statusCode} (${duration}ms)`);
    } else {
      logger.debug(`${req.method} ${req.path} -> ${statusCode} (${duration}ms)`);
    }

    return originalJson.call(this, data);
  };

  next();
};

/**
 * Error Handling Middleware
 * Records errors and exceptions
 */
const errorMetricsMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorType = err.name || 'UnknownError';
  const routeLabel = req.route?.path || req.path || 'unknown';

  // Record error metrics
  metricsController.errorsTotal.labels(errorType, routeLabel).inc();
  metricsController.exceptionsCaught.labels(errorType).inc();

  // Log the error
  logger.error(`Error in ${req.method} ${req.path}`, {
    errorType,
    statusCode,
    message: err.message,
    stack: err.stack
  });

  // Record as HTTP error
  metricsController.recordError(errorType, routeLabel);

  next(err);
};

/**
 * Request Logging Middleware
 * Logs incoming requests with details
 */
const requestLoggingMiddleware = (req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || req.id || Math.random().toString(36).substr(2, 9);
  
  // Store in request for later use
  req.correlationId = correlationId;
  req.logger = new Logger(`${req.method} ${req.path}`);
  
  req.logger.debug(`Incoming request`, {
    method: req.method,
    path: req.path,
    headers: {
      'user-agent': req.headers['user-agent'],
      'content-type': req.headers['content-type'],
      'correlation-id': correlationId
    },
    query: req.query,
    ip: req.ip
  });

  next();
};

module.exports = {
  httpMetricsMiddleware,
  errorMetricsMiddleware,
  requestLoggingMiddleware
};
