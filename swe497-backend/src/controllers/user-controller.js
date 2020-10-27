const userService = require("../services/user-service");

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req);

  const newUser = await userService.signUp(
    name,
    email,
    password,
    confirmPassword
  );

  res.status(200).json({
    status: "success",
    data: newUser,
  });
};
