const { APIError } = require("../middlewares/error-handler");
const Tutor = require("../models/Tutor");
const CourseService = require("./course-service");

exports.getAllTutors = async (skip = 5, limit = 15) => {
  try {
    const tutors = await Tutor.find({})
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return tutors;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getTutorAllCourses = async (tutorId) => {
  try {
    const tutorCourses = await Tutor.findById(tutorId)
      .select("courses")
      .populate("courses")
      .lean()
      .exec();
    return tutorCourses.courses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid tutor id");
  }
};

exports.createTutorCourse = async (tutorId, courseData) => {
  try {
    const newCourse = await CourseService.createCourse({
      ...courseData,
      author: tutorId,
    });
    console.log(newCourse._id);

    const updatedTutor = await Tutor.updateOne(
      { _id: tutorId },
      { $push: { courses: newCourse._id } }
    );

    return newCourse;
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

exports.updateTutor = async (tutorId, properties) => {
  try {
    return await Tutor.updateOne({ _id: tutorId }, { $set: properties })
      .lean()
      .exec();
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getTutor = async (tutorId) => {
  const tutor = await Tutor.findById(tutorId)
    .lean()
    .exec();

  if (!tutor) {
    throw APIError.invalidInputs();
  }

  return tutor;
};
