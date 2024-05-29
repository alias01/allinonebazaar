var createError = require("http-errors");
const { success, error, validation } = require("../utilities/apiResponse");

module.exports = (paramType, schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[paramType]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      return res.status(422).send(validation(error.details[0].message));
    }
  };
};
