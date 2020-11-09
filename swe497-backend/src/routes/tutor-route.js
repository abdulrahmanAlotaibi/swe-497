const express = require("express");
const tutorController = require("../controllers/tutor-controller");
const tutorRouter = express.Router();
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");


// @route   GET api/v1/tutors
// @desc    Get all tutors
// @access  Public
tutorRouter.get(
  "/",
  catchErrors(tutorController.getAllTutors)
);


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
  catchErrors(tutorController.getTutorAllCourses)
);

// @route   GET api/v1/tutors/:id/courses
// @desc    get all tutor courses
// @access  Public
tutorRouter.get(
  "/:tutorId/courses",
  catchErrors(tutorController.createTutorCourse)
);

// @route   GET api/v1/tutors/:id/courses/:courseId
// @desc    get all tutor courses
// @access  Public
tutorRouter.delete(
  "/:tutorId/courses/:courseId",
  catchErrors(tutorController.deleteTutorCourse)
);

// @route   GET api/v1/tutors/:id
// @desc    get tutor
// @access  Public
tutorRouter.get(
  "/:id",
  catchErrors(tutorController.getTutor)
);


// @route   GET api/v1/tutors/:id
// @desc    get tutor
// @access  Private
tutorRouter.patch(
  "/:id",
  catchErrors(tutorController.updateTutor)
);



module.exports = tutorRouter;
