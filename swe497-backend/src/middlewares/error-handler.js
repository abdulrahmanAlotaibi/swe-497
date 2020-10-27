class BaseError extends Error {
  constructor(
    name,
    isOperational = false,
    status = 500,
    message = "Internal Server Error"
  ) {
    super(message);
    this.name = name;
    this.isOperational = isOperational;
    this.status = status;

    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(
    name,
    isOperational = true,
    status = 500,
    message = "Internal Server Error",
    errors
  ) {
    super(name, isOperational, status, message);
    this.errors = errors ? errors : [];
  }

  static badRequest(
    name = "API Error",
    isOperational = true,
    status = 400,
    message = "Invalid Inputs"
  ) {
    return new APIError(name, isOperational, status, message);
  }

  static invalidInputs(newErrors) {
    const name = "API Error";
    const isOperational = true;
    const status = 422;
    const message = "Invalid inputs";
    const errors = newErrors;
    return new APIError(name, isOperational, status, message, errors);
  }

  static alreadyExsist(
    name = "API Error",
    isOperational = true,
    status = 409,
    message = "Resource already exsist"
  ) {
    return new APIError(name, isOperational, status, message);
  }

  static unAuthorized(
    name = "API Error",
    isOperational = true,
    status = 401,
    message = "Not autherized"
  ) {
    return new APIError(name, isOperational, status, message);
  }

  static forbidden(
    name = "API Error",
    isOperational = true,
    status = 403,
    message = "Forbidden"
  ) {
    return new APIError(name, isOperational, status, message);
  }

  static notFound(
    name = "API Error",
    isOperational = true,
    status = 404,
    message = "Not found"
  ) {
    return new APIError(name, isOperational, status, message);
  }
}

const catchErrors = (cb) => {
  return function(req, res, next) {
    return cb(req, res, next).catch(next);
  };
};

const handleErrors = (err, req, res, next) => {
  const { name, status, message, isOperational, errors } = err;

  if (!isOperational) {
    system.exit(1);
  }

  console.error(errors);

  res.status(status).json({
    status: "failed",
    message,
    errors: errors.errors,
  });
};

// FIXME: try to not exposed the BaseError class
module.exports = {
  BaseError,
  APIError,
  catchErrors,
  handleErrors,
};
