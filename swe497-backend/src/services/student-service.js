const { APIError } = require("../middlewares/error-handler");
const CourseService = require("./course-service");
const Student = require("../models/Student");
const Cart = require("../models/Cart");

exports.getAllStudentCourses = async (studentId) => {
  try {
    const studentCourses = await Student.findById(studentId).populate(
      "courses"
    );
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
    // TODO: handle not found
    return updatedStudent;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.favouriteCourse = async (studentId, courseId) => {
  try {
    // Add the student Id to the course
    const updatedCart = await Cart.update(
      { customerId: studentId },
      {
        $push: {
          items: courseId,
        },
      }
    );

    return updatedCart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};
