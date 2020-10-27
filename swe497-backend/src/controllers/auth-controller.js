const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const { APIError, handleErrors } = require("../middlewares/error-handler");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

exports.authUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authService.getUser(userId);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    throw new APIError();
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const token = await userService.signIn(email, password);

  res.status(200).json({
    status: "success",
    token,
  });
};
