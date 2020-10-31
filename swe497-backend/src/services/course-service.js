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
      .limit(limit)
      .exec();

    return courses;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.createCourse = async (course) => {
  try {
    return await Course.create(course);
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

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
  try {
    return await Course.deleteOne(courseId)
      .lean()
      .exec();
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getStudentCourses = async () => {};
