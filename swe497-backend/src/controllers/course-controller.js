const Course = require("../model/Course");
const Tutor = require("../model/Tutor");
const Student = require("../model/Student");
const Review = require("../model/Review");
const Video = require("../model/Video");
const multer = require("multer");
const sharp = require("sharp");
const email = require("../utilities/email");

const imageStorage = multer.memoryStorage();
const imageMulterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `course-${Date.now()}.${ext}`);
  }
});

const videoMulterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `course-${Date.now()}.${ext}`);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log("error in line 14: Course controller");
  }
};

const imageUpload = multer({
  storage: imageMulterStorage
  // fileFilter: imageFilter
});
const videoUpload = multer({
  storage: videoMulterStorage
});

exports.uploadCourseImage = imageUpload.single("photo");
exports.uploadCourseVideo = videoUpload.single("video");
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ course: req.params.id });
    res.status(200).json({
      status: "success",
      data: videos
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: video
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.updateVideos = async (req, res) => {
  try {
    const { videos } = req.body;
    const newVideos = [];
    for (const video of videos) {
      newVideos.push(
        await Video.findByIdAndUpdate(
          video._id,
          { ...video },
          { new: true, runValidators: true }
        )
      );
    }
    res.status(200).json({
      status: "success",
      data: newVideos
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.pushCourseVideo = async (req, res) => {
  try {
    if (req.file) {
      req.body.video = req.file.path;
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(401).json({
        status: "fail",
        message: "There is no course with this id"
      });
    }
    const newVideo = await Video.create({
      title: req.body.title,
      content: req.body.video,
      course: course._id
    });
    // course.videos.push(req.body.video);
    // await course.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: newVideo
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    res.status(204).json({
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

exports.createCourse = async (req, res) => {
  try {
    if (req.file) {
      req.body.img = req.file.path;
      console.log(req.file.path);
    }
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) {
      return res.status(404).json({
        status: "fail",
        message: "There is no tutor with this ID"
      });
    }
    const chapters = JSON.parse(req.body.chapters);
    const type = JSON.parse(req.body.type);

    const newCourse = await Course.create({
      ...req.body,
      chapters,
      tutor: tutor._id,
      type: type
    });
    // const { _id, chapters } = newCourse;
    // for (const chapter of chapters) {
    //   for (const topic of chapter.topics) {
    //     await Topic.create({
    //       name: topic.value,
    //       course: _id
    //     });
    //   }
    // }
    res.status(201).json({
      status: "success",
      data: newCourse
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.modefiyCourse = async (req, res) => {
  try {
    if (req.file) {
      req.body.img = req.file.path;
      console.log(req.file.path);
    }
    const chapters = JSON.parse(req.body.chapters);
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, chapters },
      {
        new: true,
        runValidators: true
      }
    );
    for (const s of course.students) {
      const student = await Student.findById(s);
      email({
        from: "asg1996@live.com",
        email: student.email,
        subject: "Course information modefications",
        message:
          "Dear Student, this course information has been modefied by the tutor, please check these modefications out"
      });
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

exports.getCoursesForAdmin = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: "success",
      getAllCourses
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getAllCourses = role => {
  return async (req, res) => {
    try {
      let courses;
      if (role === "student") {
        const student = await Student.findById(req.user._id);
        courses = [];
        for (let course of student.courses) {
          const c = await Course.findById(course);
          courses.push(c);
        }
      } else if (role === "tutor") {
        courses = await Course.find({ tutor: req.user._id });
      }
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
};

exports.getCourseByCategory = async (req, res) => {
  console.log(req);

  try {
    const courses = await Course.find({ category: req.params.category });
    if (!courses) {
      return res.status(404).json({
        status: "fail",
        message: "There is no courses with this category"
      });
    }
    res.status(200).json({
      status: "success",
      data: courses
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "No course with this ID"
      });
    }
    const tutor = await Tutor.findById(course.tutor);
    const videos = await Video.find({ course: course._id });
    // const freeVideos = [videos[0], videos[1]];
    const reviews = await Review.find({ course: course._id });
    res.status(201).json({
      status: "success",
      data: {
        course,
        tutor,
        videos,
        reviews
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "No course with this ID"
      });
    }
    const student = await Student.findById(req.user._id);
    for (let courseId of student.cart) {
      if (courseId == course._id) {
        return res.status(400).json({
          status: "fail",
          message: "The course is already in the cart"
        });
      }
    }
    student.cart.push(course._id);
    await student.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      data: {
        student,
        course
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteCourseFromCart = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      console.log("h");
      return res.status(404).json({
        status: "fail",
        message: "There is no student with this ID"
      });
    }
    let newCart;
    if (student.cart.length === 1) {
      newCart = [];
    } else {
      newCart = student.cart.filter(course => {
        return course !== req.params.id;
      });
    }
    student.cart = newCart;
    await student.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      data: newCart
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const courses = [];
    for (let c of req.user.cart) {
      courses.push(await Course.findById(c));
    }
    if (courses.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "There are no courses in the cart"
      });
    }
    let totalPrice = 0;
    for (let course of courses) {
      totalPrice += course.price;
    }
    res.status(200).json({
      status: "success",
      data: {
        courses,
        totalPrice
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.student(404).json({
        status: "fail",
        message: "There is no student with this ID"
      });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "There is no course with this ID"
      });
    }
    let reviews = await Review.find({
      student: student._id,
      course: course._id
    });
    if (reviews.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "This course is already reviewed by this student"
      });
    }
    const review = await Review.create({
      ...req.body,
      student: student.name,
      course: course._id
    });
    reviews = await Review.find({ course: course._id });
    let totalRating = 0;
    for (let review of reviews) {
      totalRating += review.rating;
    }
    course.rating = totalRating / reviews.length;
    await course.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      data: {
        student,
        course,
        review
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
