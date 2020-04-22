const Student = require("../model/student");
const Tutor = require("../model/tutor");
const Course = require("../model/course");
const email = require("../utilities/email");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: "success",
      data: courses
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: "success",
      data: students
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json({
      status: "success",
      data: tutors
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    const tutor = await Tutor.findById(course.tutor);
    email({
      from: "asg1996@live.com",
      email: tutor.email, // This is admint email
      subject: "Your course has been deleted",
      message: `Dear tutor, your course ${course.name} is deleted, for more details please contact us with this email`
    });
    for (const s of course.students) {
      const student = await Student.findById(s);
      email({
        from: "asg1996@live.com",
        email: student.email, // This is admint email
        subject: "Your course has been deleted",
        message: `Dear student, the course ${course.name} is deleted, for more details please contact us with this email`
      });
    }
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.toggleCourseSuspinsion = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    course.isSuspended = !course.isSuspended;
    // await course.save();
    await course.save({ validateBeforeSave: false });
    if (course.isSuspended) {
      const tutor = await Tutor.findById(course.tutor);
      email({
        from: "asg1996@live.com",
        email: tutor.email,
        subject: "Your course has been suspended",
        message: `Dear tutor, your course ${course.name} is suspended, for more details please contact us with this email`
      });
      for (const s of course.students) {
        const student = await Student.findById(s);
        email({
          from: "asg1996@live.com",
          email: student.email,
          subject: "Your course has been suspended",
          message: `Dear student, the course ${course.name} is suspended, for more details please contact us with this email`
        });
      }
    }
    res.status(200).json({
      status: "success",
      data: course
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.toggleStudentBannation = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    student.isBaned = !student.isBaned;
    await student.save({ validateBeforeSave: false });
    if (student.isBaned) {
      email({
        from: "asg1996@live.com",
        email: student.email,
        subject: "Your account has been banned",
        message: `Dear student, your account is banned, for more details please contact us with this email`
      });
    }
    res.status(200).json({
      status: "success",
      data: student
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.toggleTutorBannation = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findById(id);
    tutor.isBaned = !tutor.isBaned;
    await tutor.save({ validateBeforeSave: false });
    if (tutor.isBaned) {
      email({
        from: "asg1996@live.com",
        email: tutor.email,
        subject: "Your account has been banned",
        message: `Dear tutor, your account is banned, for more details please contact us with this email`
      });
    }
    res.status(200).json({
      status: "success",
      data: tutor
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// exports.getStatistics = async (req, res) => {
//   try {
//     const studentsStat = await Student.aggregate([
//       {
//         $group: {
//           numOfStudents: { $sum: 1 }
//         }
//       }
//     ]);
//     const coursesStat = await Course.aggregate([
//       {
//         $group: {
//           numOfCourses: { $sum: 1 }
//         }
//       }
//     ]);
//     res.status(200).json({
//       status: "success",
//       data: {
//         studentsStat,
//         coursesStat
//       }
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message
//     });
//   }
// };
