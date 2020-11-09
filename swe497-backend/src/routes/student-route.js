const express = require("express");
const studentController = require("../controllers/student-controller");
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");

const router = express.Router();

// @route    GET api/v1/students
// @desc     Get all students
// @access   Public
router.get("/", catchErrors(studentController.getAllStudents));

// @route    GET api/v1/students/:id
// @desc     Get a student
// @access   Public
router.get("/:id", catchErrors(studentController.getStudent));

// @route    GET api/v1/students/:id/courses/
// @desc     Get all student courses
// @access   Public
router.get("/:id/courses", catchErrors(studentController.getAllStudentCourses));

// @route    GET api/v1/students/:id/courses/
// @desc     Enroll a student in a course
// @access   Private
router.post(
  "/:studentId/courses/:courseId",
  catchErrors(studentController.enrollInCourse)
);

// @route    GET api/v1/students/:id/courses/
// @desc     Student leave a course
// @access   Private
router.delete(
  "/:studentId/courses/:courseId",
  catchErrors(studentController.leaveCourse)
);

module.exports = router;
