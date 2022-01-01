const winston = require('winston');
//Logger for logging out errors
require('winston-mongodb');
//monkey-patch all the async route handlers
require('express-async-errors');

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: 'logfile.log',
      handleExceptions: true,
      handleRejections: true,
    }),
  );
  process.on('uncaughtException', (err) => {
    winston.error(err.message, err);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    winston.error(err.message, err);
    process.exit(1);
  });
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      handleExceptions: true,
      handleRejections: true,
    }),
  );
};
