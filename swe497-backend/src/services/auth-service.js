const User = require("../models/User");

exports.getUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};
