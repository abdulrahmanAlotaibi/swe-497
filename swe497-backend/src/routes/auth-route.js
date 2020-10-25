const express = require("express");
const authController = require("../controllers/auth-controller");
const validator = require("../middlewares/validator");
const router = express.Router();

// @route   POST api/v1/auth
// @desc    Authenticate
// @access  Private
router.get("/", validator.signUp,  authController.authUser);

// @route   POST api/v1/auth
// @desc    Sign In
// @access  Public
router.post("/", validator.signIn, authController.signIn);

module.exports = router;
