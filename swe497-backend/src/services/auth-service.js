const User = require("../models/User");
const APIError = require("../middlewares/error-handler");

exports.getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");

    return user;
  } catch (err) {
    throw APIError();
  }
};
