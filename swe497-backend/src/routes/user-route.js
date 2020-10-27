const express = require("express");
const validator = require("../middlewares/validator");
const { catchErrors } = require("../middlewares/error-handler");
const userController = require("../controllers/user-controller");
const validationChecker = require("../middlewares/validationChecker");

const router = express.Router();

// @route   POST api/v1/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  validator.signUp,
  catchErrors(validationChecker),
  catchErrors(userController.signup)
);

module.exports = router;
