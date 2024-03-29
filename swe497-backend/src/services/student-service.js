const { APIError } = require("../middlewares/error-handler");
const CourseService = require("./course-service");
const Student = require("../models/Student");

exports.getAllStudents = async (skip = 5, limit = 15) => {
  try {
    const students = await Student.find({})
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return students;
  } catch (err) {
    console.error(err);
    throw new APIError();
  }
};

exports.getStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) throw APIError.notFound();

    return student;
  } catch (err) {
    throw APIError.notFound();
  }
};

exports.getAllStudentCourses = async (studentId) => {
  try {
    const studentCourses = await Student.findById(studentId)
      .select("courses")
      .populate("courses")
      .lean()
      .exec();

    if (!studentCourses) throw APIError.notFound();

    return studentCourses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.enrollInCourse = async (studentId, courseId) => {
  try {
    // Add the student Id to the course

    const updatedStudent = await Student.update(
      { _id: studentId },
      { $push: { courses: courseId } }
    );

    if (!updatedStudent) throw APIError.notFound();

    return updatedStudent;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.leaveCourse = async (studentId, courseId) => {
  try {
    // Add the student Id to the course

    const updatedStudent = await Student.update(
      { _id: studentId },
      { $pull: { courses: courseId } }
    );

    if (!updatedStudent) throw APIError.notFound();

    return updatedStudent;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};
