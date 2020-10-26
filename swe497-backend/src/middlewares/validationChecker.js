const { validationResult } = require("express-validator");
const { APIError } = require("./error-handler");

exports.validationChecker = async (req, res, next) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw APIError.invalidInputs();
  }

  next();
};
