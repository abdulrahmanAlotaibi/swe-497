const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const APIError = require("../middlewares/error-handler");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

exports.authUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = authService.getUser(userId);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.error(err.message);
    throw new APIError();
  }
};
