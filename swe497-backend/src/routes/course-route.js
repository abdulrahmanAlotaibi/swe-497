const express = require("express");
const auth = require("../controllers/auth-controller");
const { catchErrors } = require("../middlewares/error-handler");
const coursesController = require("../controllers/course-controller");
const grantAccess = require("../middlewares/permissions");
const router = express.Router();

// @route    GET api/v1/courses
// @desc     Get all courses
// @access   Public
router.get("/", coursesController.getCourses);

// @route    DELETE api/v1/courses
// @desc     delete course
// @access   Private
router.get("/", coursesController.deleteCourse);


module.exports = router;
