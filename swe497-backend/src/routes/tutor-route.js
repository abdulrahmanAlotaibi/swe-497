const express = require("express");
const tutorController = require("../controllers/tutor-controller");
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");
const auth = require("../middlewares/auth");
const permission = require("../middlewares/permissions");
const router = express.Router();

// @route   GET api/v1/tutors
// @desc    Get all tutors
// @access  Public
router.get("/", catchErrors(tutorController.getAllTutors));

// @route   POST api/v1/tutors/:id/courses
// @desc    Create a tutor course
// @access  Private
router.post(
  "/:tutorId/courses",
  auth,
  permission("course", "create:own"),
  catchErrors(tutorController.createTutorCourse)
);

// @route   GET api/v1/tutors/:id/courses
// @desc    Get all tutor courses
// @access  Public
router.get(
  "/:tutorId/courses",
  catchErrors(tutorController.getTutorAllCourses)
);

// @route   DELETE api/v1/tutors/:id/courses/:courseId
// @desc    Delete tutor course
// @access  Private
router.delete(
  "/:tutorId/courses/:courseId",
  auth,
  permission("course", "delete:own"),
  catchErrors(tutorController.deleteTutorCourse)
);

// @route   GET api/v1/tutors/:id
// @desc    get tutor
// @access  Public
router.get("/:id", catchErrors(tutorController.getTutor));

// @route   PATCH api/v1/tutors/:id
// @desc    Update tutor
// @access  Private
router.patch(
  "/:id",
  auth,
  permission("tutor", "update:own"),
  catchErrors(tutorController.updateTutor)
);

module.exports = router;
