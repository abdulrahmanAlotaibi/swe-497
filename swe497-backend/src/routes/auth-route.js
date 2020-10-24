const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../../../controllers/auth-controller");
const validator = require("../util/validator");

// @route   POST api/v1/auth
// @desc    Authenticate
// @access  Private
router.get("/", validator.signUp, auth, authController.authUser);

// @route   POST api/v1/auth
// @desc    Sign In
// @access  Public
router.post("/", validator.signIn, authController.signIn);

module.exports = router;
