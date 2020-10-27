const User = require("../models/User");
const { APIError } = require("../middlewares/error-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
exports.signIn = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      throw APIError.badRequest();
    }

    // Compare a plain text password with an encrypted password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new APIError.badRequest();
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 360000,
    });

    return token;
  } catch (err) {
    throw new APIError();
  }
};

exports.signUp = async (name, email, password, confirmPassword, role) => {
  try {
    let user = await User.findOne({ email });

    // Check if the user exsist
    if (user) {
      throw APIError.alreadyExsist();
    }

    user = new User({
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    // Salt algorithim to encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.confirmPassword = user.password;

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Send back the token
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 360000,
    });

    return token;
  } catch (err) {
    console.log(err);
    throw new APIError();
  }
};
