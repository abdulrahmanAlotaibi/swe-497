const express = require("express");
const authController = require("../controllers/auth-controller");
const validator = require("../middlewares/validator");
const auth = require("../middlewares/auth");

const { catchErrors } = require("../middlewares/error-handler");

const router = express.Router();
// @route   POST api/v1/auth
// @desc    Get user by token
// @access  Public
router.get("/", auth, catchErrors(authController.authUser));

// @route   POST api/v1/auth
// @desc    Sign In
// @access  Private
router.post("/", validator.signIn, catchErrors(authController.signIn));

module.exports = router;
