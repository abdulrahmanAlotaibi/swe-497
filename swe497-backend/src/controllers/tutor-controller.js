const Tutor = require("../model/Tutor");
const Course = require("../model/Course");

exports.getTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({
        status: "fail",
        message: "There is no tutor with this id"
      });
    }
    const courses = await Course.find({ tutor: tutor._id });
    res.status(200).json({
      status: "success",
      data: {
        tutor,
        courses
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json({
      status: "success",
      tutors
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
