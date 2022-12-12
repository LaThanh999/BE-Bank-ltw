const logger = require('../logger');

module.exports = function (req, res, next) {
  logger.info(`Method: ${req.method} - URL: ${req.baseUrl} - Successfully`);
  next();
};
