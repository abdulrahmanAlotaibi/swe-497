const courseService = require("../services/course-service");

exports.getAllCourses = async (req, res, next) => {
  const skip = parseInt(req.params.skip);

  const limit = parseInt(req.params.limit);

  const courses = await courseService.getAllCourses(skip, limit); // TODO: Add filters arg

  res.status(200).json({
    status: "success",
    data: { courses },
  });
};

exports.getCourse = async (req, res, next) => {
  const courseId = req.params.id;

  const course = await courseService.getCourse(courseId);

  res.status(200).json({
    status: "success",
    data: { course },
  });
};

exports.createCourse = async (req, res, next) => {
  const courseData = ({
    title,
    price,
    description,
    startDate,
    mainCategory,
    subCategory,
    institution,
    img,
    imgPath,
    chapters,
    tags,
  } = req.body);

  const course = await courseService.createCourse(courseData);

  res.status(200).json({
    status: "success",
    data: { course },
  });
};

exports.updateCourse = async (req, res, next) => {
  const courseId = req.params.id;

  // Course properties to be updated
  const properties = req.body.properties;

  const updatedCourse = await courseService.updateCourse(courseId, properties);

  res.status(200).json({
    status: "success",
    data: { updatedCourse },
  });
};

exports.deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;

  const deletedCourse = await courseService.deleteCourse(courseId);

  res.status(200).json({ status: "success", data: { deletedCourse } });
};
