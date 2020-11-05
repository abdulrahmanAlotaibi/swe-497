const Course = require("../models/Course");
const Category = require("../models/Category");
const Institution = require("../models/Institution");
const Tutor = require("../models/Tutor");
const { APIError } = require("../middlewares/error-handler");

/**
 * TODO: Add filters
 * TODO: Add pagination
 */

exports.getCourses = async (skip = 5, limit = 15) => {
  try {
    const courses = await Course.find({})
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return courses;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getCourse = async (courseId) => {
  const course = await Course.findById(courseId)
    .lean()
    .exec();

  if (!course) {
    throw APIError.invalidInputs();
  }

  return course;
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
    return await Course.deleteOne({ _id: courseId })
      .lean()
      .exec();
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

// TODO: Add more CRUD
