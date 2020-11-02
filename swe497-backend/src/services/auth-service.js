const User = require("../models/User");
const Student = require("../models/Student");
const Tutor = require("../models/Tutor");

const APIError = require("../middlewares/error-handler");

exports.getUser = async (userId, role) => {
  try {
    let user;
    console.log(role, userId);
    if (role === "student") {
      user = await Student.findById(userId).select("-password");
    } else if (role === "tutor") {
      user = await Tutor.findById(userId).select("-password");
    }

    return user;
  } catch (err) {
    throw APIError();
  }
};
