const TutorService = require("../services/tutor-service");

exports.getAllTutors = async (req, res) => {
  const skip = parseInt(req.params.skip);
  const limit = parseInt(req.params.limit);

  const tutors = await TutorService.getAllTutors(skip, limit);

  res.status(200).json({
    status: "success",
    data: {
      tutors,
    },
  });
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

  const courseData = ({
    title,
    price,
    description,
    mainCategory,
    subCategory,
    institution,
    img,
    imgPath,
    chapters,
    tags,
  } = req.body);

  const courses = await TutorService.createTutorCourse(tutorId, courseData);

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};

exports.deleteTutorCourse = async (req, res, next) => {
  const tutorId = req.params.tutorId;
  const courseId = req.params.courseId;

  const deletedCourse = await TutorService.deleteTutorCourse(tutorId, courseId);

  res.status(200).json({
    status: "success",
    message: "Course has been deleted",
  });
};

exports.updateTutor = async (req, res) => {
  const tutorId = req.params.id;

  // Tutor properties to be updated
  const properties = req.body.properties;

  const updatedTutor = await TutorService.updateTutor(tutorId, properties);

  res.status(200).json({
    status: "success",
    data: "Information has been updated",
  });
};

exports.getTutor = async (req, res) => {
  const tutorId = req.params.id;

  const tutor = await TutorService.getTutor(tutorId);

  res.status(200).json({
    status: "success",
    data: { tutor },
  });
};
