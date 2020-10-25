class BaseError extends Error {
  constructor(
    name,
    httpStatusCode = 500,
    isOperational = false,
    description = "Internal Server Error"
  ) {
    super(description);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}


class APIError extends BaseError {
  constructor(
    name,
    httpStatusCode = 500,
    isOperational = true,
    description = "Internal Server Error"
  ) {
    super(name, httpStatusCode, isOperational, description);
  }

  static badRequest(
    name = "API Error",
    httpStatusCode = 400,
    isOperational = true,
    description = "Invalid Inputs"
  ) {
    return new APIError(name, httpStatusCode, isOperational, description);
  }
}

// FIXME: try to not exposed the BaseError class
module.exports = {
  BaseError,
  APIError,
};
