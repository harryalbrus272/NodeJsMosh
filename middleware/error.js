const winston = require('winston');
module.exports = function (err, req, res, next) {
  /* Order of importance of logs
    error
    warn
    info
    verbose
    debug
    silly */
  //   winston.log('error', err.message);
  winston.error(err.message, err);
  if (err) return res.status(500).send('Something wrong with the server');
};
