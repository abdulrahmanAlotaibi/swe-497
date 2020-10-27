const express = require("express");
const authController = require("../controllers/auth-controller");
const validator = require("../middlewares/validator");
const auth = require("../middlewares/auth");
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors, handleErrors } = require("../middlewares/error-handler");

const router = express.Router();

// @route   GET api/v1/auth
// @desc    Get user by token
// @access  Public
router.get("/", auth, authController.authUser);

// @route   POST api/v1/auth
// @desc    Sign In
// @access  Private
router.post(
  "/",
  validator.signIn,
  catchErrors(validationChecker),
  catchErrors(authController.signIn)
);

module.exports = router;
