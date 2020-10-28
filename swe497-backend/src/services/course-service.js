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

exports.createCourse = async (newCourse) => {};

exports.updateCourse = async (courseId, properties) => {
  try {
    return await Course.updateOne({ _id: courseId }, { $set: properties })
      .lean()
      .exec();
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.deleteCourse = async (courseId) => {
  console.log(courseId);
  try {
    const deletedCourse = await Course.findOneAndDelete(courseId);
    // TODO: Add validation for non-exsistent docs
    return deletedCourse;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getStudentCourses = async () => {};
