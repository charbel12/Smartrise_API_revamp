const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVEL = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

const LOG_LEVEL_NAMES = {
  0: 'ERROR',
  1: 'WARN',
  2: 'INFO',
  3: 'DEBUG',
  4: 'TRACE'
};

class Logger {
  constructor(context = 'APP', options = {}) {
    this.context = context;
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Development: Log everything from DEBUG level and above
    // Production: Log only ERROR, WARN, and INFO levels
    this.currentLogLevel = this.isDevelopment ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO;
    
    this.options = {
      logToFile: options.logToFile !== false,
      logToConsole: options.logToConsole !== false,
      ...options
    };
  }

  /**
   * Format log message with timestamp and context
   */
  _formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    let formattedMsg = `[${timestamp}] [${level}] [${this.context}] ${message}`;
    
    if (data) {
      try {
        formattedMsg += ` ${typeof data === 'string' ? data : JSON.stringify(data)}`;
      } catch (e) {
        formattedMsg += ` ${data.toString()}`;
      }
    }
    
    return formattedMsg;
  }

  /**
   * Log to console with color coding
   */
  _logToConsole(level, message, data = null) {
    const formattedMsg = this._formatMessage(level, message, data);
    
    // Color codes for console output
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[35m', // Magenta
      TRACE: '\x1b[37m'  // White
    };
    const reset = '\x1b[0m';
    
    const coloredMsg = `${colors[level]}${formattedMsg}${reset}`;
    console.log(coloredMsg);
  }

  /**
   * Log to file
   */
  _logToFile(level, message, data = null) {
    if (!this.options.logToFile) return;
    
    const formattedMsg = this._formatMessage(level, message, data);
    const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
    const allLogsFile = path.join(logsDir, 'app.log');
    
    try {
      // Write to level-specific log file
      fs.appendFileSync(logFile, formattedMsg + '\n', 'utf8');
      
      // Write to combined log file
      fs.appendFileSync(allLogsFile, formattedMsg + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }

  /**
   * Internal log function
   */
  _log(levelValue, levelName, message, data = null) {
    if (levelValue > this.currentLogLevel) {
      return; // Skip logs below current level
    }
    
    if (this.options.logToConsole) {
      this._logToConsole(levelName, message, data);
    }
    
    this._logToFile(levelName, message, data);
  }

  // Public logging methods
  error(message, data = null) {
    this._log(LOG_LEVEL.ERROR, 'ERROR', message, data);
  }

  warn(message, data = null) {
    this._log(LOG_LEVEL.WARN, 'WARN', message, data);
  }

  info(message, data = null) {
    this._log(LOG_LEVEL.INFO, 'INFO', message, data);
  }

  debug(message, data = null) {
    this._log(LOG_LEVEL.DEBUG, 'DEBUG', message, data);
  }

  trace(message, data = null) {
    this._log(LOG_LEVEL.TRACE, 'TRACE', message, data);
  }

  /**
   * Log HTTP request
   */
  httpRequest(method, path, statusCode, duration, data = null) {
    const level = statusCode >= 400 ? 'WARN' : 'INFO';
    const levelValue = statusCode >= 400 ? LOG_LEVEL.WARN : LOG_LEVEL.INFO;
    const message = `${method} ${path} -> ${statusCode} (${duration}ms)`;
    this._log(levelValue, level, message, data);
  }

  /**
   * Log database operation
   */
  database(operation, table, duration, success = true, error = null) {
    const level = success ? 'DEBUG' : 'ERROR';
    const levelValue = success ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR;
    const message = `[DB] ${operation} on ${table} (${duration}ms)`;
    this._log(levelValue, level, message, error);
  }

  /**
   * Log authentication event
   */
  auth(event, userId = null, data = null) {
    const message = `[AUTH] ${event}${userId ? ` (User: ${userId})` : ''}`;
    this._log(LOG_LEVEL.INFO, 'INFO', message, data);
  }

  /**
   * Log with custom level
   */
  log(levelName, message, data = null) {
    const levelValue = LOG_LEVEL[levelName.toUpperCase()];
    if (levelValue === undefined) {
      this.warn(`Unknown log level: ${levelName}`);
      return;
    }
    this._log(levelValue, levelName.toUpperCase(), message, data);
  }

  /**
   * Set log level dynamically
   */
  setLogLevel(level) {
    const levelValue = LOG_LEVEL[level.toUpperCase()];
    if (levelValue !== undefined) {
      this.currentLogLevel = levelValue;
      this.info(`Log level changed to ${level.toUpperCase()}`);
    }
  }

  /**
   * Get current log level
   */
  getLogLevel() {
    return LOG_LEVEL_NAMES[this.currentLogLevel];
  }
}

module.exports = Logger;
