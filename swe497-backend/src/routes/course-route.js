const express = require("express");
const auth = require("../controllers/auth-controller");
const { catchErrors } = require("../middlewares/error-handler");
const coursesController = require("../controllers/course-controller");
const grantAccess = require("../middlewares/permissions");
const router = express.Router();

// @route    GET api/v1/courses
// @desc     Get all courses
// @access   Public
router.get("/courses", auth);

module.exports = router;
