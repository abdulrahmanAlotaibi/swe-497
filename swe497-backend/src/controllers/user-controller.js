const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.signup = async (req, res, next) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  try {
    // if the user exsist
    const { name, email, password, confirmPassword } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: "failed",
        errors: [{ msg: "User already exsist" }],
      });
    }

    user = new User({
      name,
      email,
      password,
      confirmPassword,
    });
    // Salt algorithim
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    user.confirmPassword = user.password;

    const newUser = await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Send back the token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
