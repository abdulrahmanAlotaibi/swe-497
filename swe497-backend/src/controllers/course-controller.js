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

exports.createCourse = async (req, res, next) => {
  // TODO: Check this
  const {name} = req.body
};

exports.editCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const properties = req.body.properties;

  const updatedCourse = await courseService.updateCourse(courseId, properties);

  res.status(200).json({
    status: "success",
    message: "the course has been updated",
    data: updatedCourse,
  });
};

exports.deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;

  const deletedCourse = await courseService.deleteCourse(courseId);

  res.status(200).json({
    status: "success",
    data: deletedCourse,
  });
};
