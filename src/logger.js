// Implement a robust logging system
// It should be able to log to a file and to the console
// It should be able to log different levels of messages
// It should be able to log different types of messages
// Logging levels: debug, info, warn, error

const fs = require('fs');
const path = require('path');

const logLevels = {
  verbose: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

const logging = {
  console: 'console',
  file: 'file',
  both: 'true',
};

class Logger {
  constructor(isLogging = 'true', logFile = null, level = 'debug') {
    this.logFile = logFile;
    this.level = level;
    this.isLogging = isLogging;

    if (logFile) {
      // create parent directory if it doesn't exist
      const parentDir = path.dirname(logFile);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir);
      }
    }

    this.info(
      'Logger initialized ',
      'with log level',
      level,
      'and logging to',
      isLogging === 'true' ? 'both console and file' : isLogging,
      logFile ? `at ${logFile}` : ''
    );
  }

  log(level, message) {
    if (logLevels[level] >= logLevels[this.level]) {
      const logMessage = `${new Date().toISOString()} - ${level.toUpperCase()} - ${message}`;
      // prettier-ignore
      if (
        this.logFile
        && (this.isLogging === logging.file || this.isLogging === logging.both)
      ) {
        fs.appendFileSync(this.logFile, `${logMessage}\n`);
      }

      // prettier-ignore
      if (
        this.isLogging === logging.console
        || this.isLogging === logging.both
      ) {
        // eslint-disable-next-line no-console
        console.log(logMessage);
      }
    }
  }

  verbose(...args) {
    this.log('verbose', args.join(' '));
  }

  debug(...args) {
    this.log('debug', args.join(' '));
  }

  info(...args) {
    this.log('info', args.join(' '));
  }

  warn(...args) {
    this.log('warn', args.join(' '));
  }

  error(...args) {
    this.log('error', args.join(' '));
  }

  close() {
    if (this.logFile) {
      fs.closeSync(this.logFile);
    }
  }
}

const Log = new Logger(
  process.env.LOGGING,
  process.env.LOG_FILE,
  process.env.LOG_LEVEL
);

module.exports = Log;
