const userService = require("../services/user-service");
const { APIError } = require("../middlewares/error-handler");

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const token = userService.signIn(email, password);

  res.status(200).json({
    status: "success",
    token,
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = userService.signUp(name, email, password, confirmPassword);

  res.status(200).json({
    status: "success",
    data: newUser,
  });
};
