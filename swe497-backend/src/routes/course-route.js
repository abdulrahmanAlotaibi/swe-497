const express = require("express");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../middlewares/error-handler");
const coursesController = require("../controllers/course-controller");
const grantAccess = require("../middlewares/permissions");
const router = express.Router();
const permission = require("../middlewares/permissions");

// @route    GET api/v1/courses
// @desc     Get all courses
// @access   Public
router.get("/", auth, catchErrors(coursesController.getAllCourses));

// @route    POST api/v1/courses
// @desc     Get a course
// @access   Public
router.get("/:id", auth, catchErrors(coursesController.getCourse));

// @route    POST api/v1/courses
// @desc     Create a course
// @access   Private
router.post(
  "/",
  auth,
  permission("course", "create:own"),
  catchErrors(coursesController.createCourse)
);

// @route    patch api/v1/courses/:id
// @desc     Update a course
// @access   Private
router.patch(
  "/:id",
  auth,
  permission("course", "update:own"),
  catchErrors(coursesController.updateCourse)
);

// @route    DELETE api/v1/courses/:id
// @desc     delete course
// @access   Private
router.delete(
  "/:id",
  auth,
  permission("course", "delete:own"),
  catchErrors(coursesController.deleteCourse)
);

module.exports = router;
