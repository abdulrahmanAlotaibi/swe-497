const StudentService = require("../services/student-service");

exports.getAllStudents = async (req, res) => {
  const skip = parseInt(req.params.skip);
  const limit = parseInt(req.params.limit);

  const students = await StudentService.getAllStudents(skip, limit);

  res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
};

exports.getStudent = async (req, res) => {
  const studentId = req.params.id;

  const student = await StudentService.getStudent(studentId);

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

exports.getAllStudentCourses = async (req, res) => {
  const studentId = req.params.id;

  const courses = await StudentService.getAllStudentCourses(studentId);

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};

exports.enrollInCourse = async (req, res) => {
  const studentId = req.params.studentId;

  const courseId = req.params.courseId;

  const courses = await StudentService.enrollInCourse(studentId, courseId);

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};

exports.leaveCourse = async (req, res) => {
  const studentId = req.params.studentId;

  const courseId = req.params.courseId;

  const updatedStudent = await StudentService.leaveCourse(studentId, courseId);

  res.status(200).json({
    status: "success",
    data: {
      updatedStudent,
    },
  });
};
