const Course = require("../models/Course");
const { APIError } = require("../middlewares/error-handler");
/**
 * todo: Add filters
 * todo: Add pagination
 */
exports.getCourses = async (skip, limit) => {
  try {
  
    const courses = await Course.find({})
      .skip(skip)
      .limit(limit);

    return courses;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.createCourse = async () => {};

exports.editCourse = async () => {};

exports.deleteCourse = async () => {};

exports.getStudentCourses = async () => {};
