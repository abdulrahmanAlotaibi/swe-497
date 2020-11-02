const express = require("express");
const tutorController = require("../controllers/tutor-controller");
const tutorRouter = express.Router();
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");

// @route   POST api/v1/tutors/:id/courses
// @desc    create a tutor course
// @access  Public
tutorRouter.post(
  "/:tutorId/courses",
  catchErrors(tutorController.createTutorCourse)
);

// @route   GET api/v1/tutors/:id/courses
// @desc    get all tutor courses
// @access  Public
tutorRouter.get(
  "/:tutorId/courses",
  catchErrors(tutorController.createTutorCourse)
);

module.exports = tutorRouter;
