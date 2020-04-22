const express = require("express");
const authController = require("../../controllers/auth");
const studentController = require("../../controllers/student");
const courseController = require("../../controllers/course");

const studentRouter = express.Router();

studentRouter.route("/").get(studentController.getAllStudents);

studentRouter.route("/:id/update-me").patch(authController.updateStudentProfile);

studentRouter
  .route("/courses")
  .get(
    authController.protect("student"),
    courseController.getAllCourses("student")
  );
studentRouter.route("/signup").post(authController.signup);
studentRouter.route("/login").post(authController.login);
studentRouter.route("/:id").get(studentController.getStudent);

module.exports = studentRouter;

