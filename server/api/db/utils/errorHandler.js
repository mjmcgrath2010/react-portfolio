var logger = require('./logger');

var errorHandler = function(err, req, res, next) {
  logger.log(err);
  next();
};

module.exports = errorHandler;
