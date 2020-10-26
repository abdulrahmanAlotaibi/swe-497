const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");


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
  } catch (err) {
    console.error(err);
  }
};



exports.signUp = async (req, res,next) =>{
  
}