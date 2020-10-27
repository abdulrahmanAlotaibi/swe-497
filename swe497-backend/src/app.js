const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { APIError,handleErrors } = require("./middlewares/error-handler");
const rateLimiter = require("./middlewares/rate-limiter");

const app = express();

// Logging in dev mode
app.use(morgan("dev"));

// To parse incoming requests as json
app.use(express.json());

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Define API rate limiting
app.use(rateLimiter);

// Define Routes
app.use("/api/v1/auth", require("./routes/auth-route"));
app.use("/api/v1/users", require("./routes/user-route"));

// app.use("/api/v1/")
app.use("/", (req, res) => {
  throw APIError.notFound();
});

// error handler
app.use(handleErrors);

module.exports = app;
