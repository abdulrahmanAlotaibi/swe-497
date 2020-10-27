const userService = require("../services/user-service");

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  const newUser = await userService.signUp(
    name,
    email,
    password,
    confirmPassword,
    role
  );

  res.status(200).json({
    status: "success",
    data: newUser,
  });
};
