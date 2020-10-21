const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const sharp = require("sharp");
const Student = require("../model/Student");
const Tutor = require("../model/Tutor");
const { promisify } = require("util");

const imageStorage = multer.memoryStorage();

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     console.log("error in line 15");
//     // cb(new AppError("Only images is allowed to be uploaded", 400), false);
//   }
// };

// const upload = multer({
//   storage: imageStorage,
//   fileFilter: imageFilter
// });

// exports.uploadUserImage = upload.single("photo");

const signToken = id => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "30d"
  });
};

// exports.resizeImage = (req, res, next) => {
//   if (req.file) {
//     req.file.filename = "user-" + req.user.id + "-" + Date.now() + ".jpeg";
//     sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat("jpeg")
//       .jpeg({ quality: 90 })
//       .toFile("public/img/users/" + req.file.filename);
//   }
//   next();
// };

exports.protect = role => {
  return async (req, res, next) => {
    try {
      let token;
      if (role === "admin") {
        return next();
      }
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "You are not logged in"
        });
      }
      const decoded = await promisify(jwt.verify)(token, "secret");
      let currentUser;

      if (role === "student") {
        currentUser = await Student.findById(decoded.id);
      } else if (role === "tutor") {
        currentUser = await Tutor.findById(decoded.id);
      }

      if (!currentUser) {
        return res.status(401).json({
          status: "fail",
          message: "This account is no longer exist"
        });
      }
      // if (currentUser.isPasswordChanged(decoded.iat)) {
      //   next(
      //     new AppError(
      //       "User's password has been changed, please login again",
      //       401
      //     )
      //   );
      // }
      req.user = currentUser;
      next();
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message
      });
    }
  };
};

exports.signup = async (req, res) => {
  try {
    let newUser;
    if (req.body.role === "student") {
      newUser = await Student.create({
        ...req.body
      });
    } else if (req.body.role === "tutor") {
      newUser = await Tutor.create({
        ...req.body
      });
    }
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: newUser
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.updateTutorProfile = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (req.body.oldPassword) {
      if (
        !(await tutor.correctPassword(req.body.oldPassword, tutor.password))
      ) {
        throw new Error("The old password is wrong");
      }
      tutor.password = req.body.newPassword;
      tutor.confirmPassword = req.body.confirmPassword;
      delete req.body.oldPassword;
      delete req.body.newPassword;
      delete req.body.confirmPassword;
      await tutor.save();
      await Tutor.findByIdAndUpdate(
        tutor._id,
        { ...req.body, password: tutor.password },
        { new: true, runValidators: true }
      );
    } else {
      await Tutor.findByIdAndUpdate(
        tutor._id,
        { ...req.body },
        { new: true, runValidators: false }
      );
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
exports.updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (req.body.oldPassword) {
      console.log("fff", req.body.oldPassword);
      if (
        !(await student.correctPassword(req.body.oldPassword, student.password))
      ) {
        throw new Error("The old password is wrong");
      }
      student.password = req.body.newPassword;
      student.confirmPassword = req.body.confirmPassword;
      delete req.body.oldPassword;
      delete req.body.newPassword;
      delete req.body.confirmPassword;
      await student.save();
      await Student.findByIdAndUpdate(
        student._id,
        { ...req.body, password: student.password },
        { new: true, runValidators: true }
      );
    } else {
      await Student.findByIdAndUpdate(
        student._id,
        { ...req.body },
        { new: true, runValidators: false }
      );
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

exports.login = async (req, res) => {
  try {
    let currentUser;
    if (req.body.role === "student") {
      currentUser = await Student.findOne({ email: req.body.email });
    } else if (req.body.role === "tutor") {
      currentUser = await Tutor.findOne({ email: req.body.email });
      if (!currentUser) {
        throw new Error("Email or password are wrong");
      }
      if (currentUser.isBaned) {
        throw new Error(
          "Your account has been banned, please contact us for more details"
        );
      }
      if (
        !currentUser ||
        !(await currentUser.correctPassword(
          req.body.password,
          currentUser.password
        ))
      ) {
        return res.status(401).json({
          status: "fail",
          message: "Email or password are wrong"
        });
      }
      const currentDate = new Date().getTime() / 1000;
      const stripeDate = currentUser.subscriptionExpiresIn.getTime() / 1000;
      if (stripeDate < currentDate) {
        res.status(401).json({
          status: "fail",
          message: "Tutor's subscription has been expired",
          data: currentUser._id
        });
      }
    }

    if (!currentUser) {
      throw new Error("Email or password are wrong");
    }
    if (currentUser.isBaned) {
      throw new Error(
        "Your account has been banned, please contact us for more details"
      );
    }
    if (
      !currentUser ||
      !(await currentUser.correctPassword(
        req.body.password,
        currentUser.password
      ))
    ) {
      return res.status(401).json({
        status: "fail",
        message: "Email or password are wrong"
      });
    }
    const token = signToken(currentUser._id);
    res.status(200).json({
      status: "success",
      user: currentUser,
      token
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
