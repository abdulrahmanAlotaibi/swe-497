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
    message = "Internal Server Error"
  ) {
    super(name, isOperational, status, message);
  }

  static badRequest(
    name = "API Error",
    isOperational = true,
    status = 400,
    message = "Invalid Inputs"
  ) {
    return new APIError(name, isOperational, status, message);
  }

  static invalidInputs(
    name = "API Error",
    isOperational = true,
    status = 422,
    message = "Invalid inputs"
  ) {
    return new APIError(name, isOperational, status, message);
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

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    ),
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    "text/html": () => {
      res.render("error", errorDetails);
    }, // Form Submit, Reload the page
    "application/json": () => res.json(errorDetails), // Ajax call, send JSON back
  });
};

/*
  Production Error Hanlder

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
};

// FIXME: try to not exposed the BaseError class
module.exports = {
  BaseError,
  APIError,
  catchErrors,
};
