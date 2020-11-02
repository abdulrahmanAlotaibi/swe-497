const { APIError } = require("../middlewares/error-handler");
const Tutor = require("../models/Tutor");

exports.getTutorAllCourses = async (tutorId) => {
  try {
    const tutorCourses = await Tutor.findById(tutorId).populate("courses");
    return tutorCourses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};

exports.createTutorCourse = async (tutorId) => {
  try {
    const tutorCourses = await Tutor.findById(tutorId).populate("courses");
    return tutorCourses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};

