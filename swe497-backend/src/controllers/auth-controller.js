const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.verifyToken = (req, res, next) => {
  // Get token from request header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

exports.signIn = async (req, res, next) => {
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
    const { email, password } = req.body;
    // let user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({
        status: "failed",
        errors: [{ msg: "Invalid Credintials", param: "email" }],
      });
    }

    return res.status(400).json({
      status: "failed",
      errors: [{ msg: "Invalid Credintials", param: "password" }],
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
