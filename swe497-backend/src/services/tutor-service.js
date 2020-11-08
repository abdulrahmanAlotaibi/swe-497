const { APIError } = require("../middlewares/error-handler");
const Tutor = require("../models/Tutor");
const CourseService = require("./course-service");

exports.getTutorAllCourses = async (tutorId) => {
  try {
    const tutorCourses = await Tutor.findById(tutorId)
      .select("courses")
      .populate("courses")
      .lean()
      .exec();
    return tutorCourses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};

exports.createTutorCourse = async (tutorId, courseData) => {
  try {
    const newCourse = await CourseService.createCourse(courseData);
    console.log(newCourse._id);

    const updatedTutor = await Tutor.updateOne(
      { _id: tutorId },
      { $push: { courses: newCourse._id } }
    );

    return { updatedTutor, newCourse };
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};

exports.deleteTutorCourse = async (tutorId, courseId) => {
  try {
    const deletedCourseReference = await Tutor.updateOne(
      {
        _id: tutorId,
      },
      { $pull: { courses: { $in: courseId } } }
    );

    if (deletedCourseReference.n != 1) throw APIError.notFound();

    const deletedCourse = await CourseService.deleteCourse(courseId);

    return { deletedCourseReference, deletedCourse };
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};
