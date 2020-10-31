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
  const courseData = ({
    name,
    price,
    description,
    startDate,
    category,
    institution,
    img,
    imgPath,
    chapters,
  } = req.body);

  const course = await courseService.createCourse(courseData);

  res.status(200).json({
    status: "success",
    data: course,
  });
};

exports.updateCourse = async (req, res, next) => {
  const courseId = req.params.id;

  const properties = req.body.properties;

  const updatedCourse = courseService.updateCourse(courseId, properties);

  res.status(200).json({
    status: "success",
    data: updatedCourse,
  });
};

exports.deleteCourse = async (req, res, next) => {
  courseId = parseInt(req.params.id);

  const deletedCourse = await courseService.deleteCourse(courseId);

  res.status(200).json({ status: "success", data: deletedCourse });
};
