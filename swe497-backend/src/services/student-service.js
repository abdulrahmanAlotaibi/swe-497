const { APIError } = require("../middlewares/error-handler");

exports.getStudentCourses = async (studentId) => {
  try {
    const studentCourses = await Student.findById(studentId).populate("courses");
    return studentCourses;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};
