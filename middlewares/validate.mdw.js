const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const logger = require('../logger');

module.exports = function (schema) {
  return function validate(req, res, next) {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      logger.error(
        `Method: ${req.method} - URL: ${req.baseUrl} - Message: ${validate.errors[0].message}`,
      );
      return res.status(400).json(validate.errors);
    } else {
      logger.info(`Method: ${req.method} - URL: ${req.baseUrl} - Successfully`);
    }
    next();
  };
};
