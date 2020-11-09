const express = require("express");
const tutorController = require("../controllers/tutor-controller");
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");

const router = express.Router();

// @route   GET api/v1/tutors
// @desc    Get all tutors
// @access  Public
router.get("/", catchErrors(tutorController.getAllTutors));

// @route   POST api/v1/tutors/:id/courses
// @desc    create a tutor course
// @access  Public
router.post(
  "/:tutorId/courses",
  catchErrors(tutorController.createTutorCourse)
);

// @route   GET api/v1/tutors/:id/courses
// @desc    get all tutor courses
// @access  Public
router.get(
  "/:tutorId/courses",
  catchErrors(tutorController.getTutorAllCourses)
);

// @route   GET api/v1/tutors/:id/courses
// @desc    get all tutor courses
// @access  Public
router.get("/:tutorId/courses", catchErrors(tutorController.createTutorCourse));

// @route   GET api/v1/tutors/:id/courses/:courseId
// @desc    get all tutor courses
// @access  Public
router.delete(
  "/:tutorId/courses/:courseId",
  catchErrors(tutorController.deleteTutorCourse)
);

// @route   GET api/v1/tutors/:id
// @desc    get tutor
// @access  Public
router.get("/:id", catchErrors(tutorController.getTutor));

// @route   GET api/v1/tutors/:id
// @desc    get tutor
// @access  Private
router.patch("/:id", catchErrors(tutorController.updateTutor));

module.exports = router;
