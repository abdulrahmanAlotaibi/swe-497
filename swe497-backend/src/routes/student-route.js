const express = require("express");
const studentController = require("../controllers/student-controller");

const router = express.Router();

// @route    GET api/v1/students/:id
// @desc     Get a student
// @access   Public
router.get("/:id", studentController.getStudent);

// @route    GET api/v1/students/:id/courses/
// @desc     Get all student courses
// @access   Public
router.get("/:id", studentController.getAllStudentCourses);

// @route    GET api/v1/students/:id/courses/
// @desc     Enroll a student in a course
// @access   Private
router.post("/:id", studentController.enrollInCourse);

// @route    GET api/v1/students/:id/courses/
// @desc     Enroll a student in a course
// @access   Private
router.patch("/:id/courses", studentController.leaveCourse);

// @route    POST api/v1/students/:id/cart/
// @desc     Add course to favourite
// @access   Private
router.post("/:id/cart", studentController.favouriteCourse);

// @route    GET api/v1/students/:id/courses/
// @desc     Add course to favourite
// @access   Private
router.patch("/:id/cart", studentController.removeFavouriteCourse);

module.exports = studentRouter;
