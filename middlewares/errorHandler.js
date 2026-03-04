const Logger = require('../helpers/logger');
const appLogger = new Logger('APP');

const notFoundHandler = (req, res) => {
  appLogger.warn(`Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    status: 404
  });
};

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';
  
  appLogger.error(`Global error handler: ${errorMessage}`, {
    statusCode,
    path: req.path,
    method: req.method,
    stack: err.stack
  });

  res.status(statusCode).json({
    error: errorMessage,
    status: statusCode
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
