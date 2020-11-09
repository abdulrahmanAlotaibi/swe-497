const express = require("express");
const studentController = require("../controllers/student-controller");

const router = express.Router();

// @route    GET api/v1/students
// @desc     Get all students
// @access   Public
router.get("/", studentController.getAllStudents);

// @route    GET api/v1/students/:id
// @desc     Get a student
// @access   Public
router.get("/:id", studentController.getStudent);

// @route    GET api/v1/students/:id/courses/
// @desc     Get all student courses
// @access   Public
router.get("/:id/courses", studentController.getAllStudentCourses);

// @route    GET api/v1/students/:id/courses/
// @desc     Enroll a student in a course
// @access   Private
router.post("/:studentId/courses/:courseId", studentController.enrollInCourse);

// @route    GET api/v1/students/:id/courses/
// @desc     Student leave a course
// @access   Private
router.delete("/:studentId/courses/:courseId", studentController.leaveCourse);


module.exports = router;
