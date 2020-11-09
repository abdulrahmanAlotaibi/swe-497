const { APIError } = require("../middlewares/error-handler");
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

exports.authUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const user = await authService.getUser(userId, role);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    throw new APIError();
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password, role } = req.body;
  console.log(email, password, role);
  const token = await userService.signIn(email, password, role);

  res.status(200).json({
    status: "success",
    data: { token },
  });
};
