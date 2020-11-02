const Tutor = require("../models/Tutor");
const Course = require("../models/Course");
const TutorService = require("../services/tutor-service");

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json({
      status: "success",
      tutors,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTutor = async (req, res) => {
  const tutorId = req.params.tutorId;

  try {
    const tutors = await Tutor.deleteOne(tutorId);

    res.status(200).json({
      status: "success",
      tutors,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTutor = async (req, res) => {
  const tutorId = req.params.tutorId;

  try {
    const tutors = await Tutor.deleteOne(tutorId);

    res.status(200).json({
      status: "success",
      tutors,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTutorAllCourses = async (req, res, next) => {
  const tutorId = req.params.tutorId;

  const courses = await TutorService.getTutorAllCourses(tutorId);

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};

exports.createTutorCourse = async (req, res, next) => {
  const tutorId = req.params.tutorId;

  const courses = await TutorService.deleteTutorCourse(tutorId);

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};
