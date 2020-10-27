const courseService = require("../services/course-service");

exports.getCourses = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  const courses = await courseService.getCourses(skip, limit);

  res.status(200).json({
    status: "success",
    data: courses,
  });
};

exports.createCourse = async (req, res, next) => {};

exports.editCourse = async (req, res, next) => {};

exports.deleteCourse = async (req, res, next) => {};
