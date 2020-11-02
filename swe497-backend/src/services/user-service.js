const User = require("../models/User");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const { APIError } = require("../middlewares/error-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.signIn = async (email, password, role) => {
  try {
    let user;
    if (role === "student") {
      user = await Student.findOne({ email });
    } else if (role === "tutor") {
      user = await Tutor.findOne({ email });
    }

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
        role: user.role,
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

exports.signUp = async (newAccount) => {
  try {
    let user;

    if (newAccount.role === "student") {
      user = await Student.findOne({ email: newAccount.email }).exec();
    } else if (newAccount.role === "tutor") {
      user = await Tutor.findOne({ email: newAccount.email }).exec();
    }

    // Check if the user exsist
    if (user) {
      throw APIError.alreadyExsist();
    }

    // Salt algorithim to encrypt password
    const salt = await bcrypt.genSalt(10);

    newAccount.password = await bcrypt.hash(newAccount.password, salt);

    let newUser;

    if (newAccount.role === "student") {
      newUser = await Student.create(newAccount);
    } else if (newAccount.role === "tutor") {
      newUser = await Tutor.create(newAccount);
    }

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role,
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
