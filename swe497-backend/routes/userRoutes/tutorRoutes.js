const express = require("express");
const authController = require("../../controllers/auth");
const tutorController = require("../../controllers/tutor");
const courseController = require("../../controllers/course");

const tutorRouter = express.Router();

tutorRouter.route("/").get(tutorController.getAllTutors);

tutorRouter.route("/:id/update-me").patch(authController.updateTutorProfile);

tutorRouter
  .route("/courses")
  .get(
    authController.protect("tutor"),
    courseController.getAllCourses("tutor")
  );
tutorRouter.route("/:id").get(tutorController.getTutor);
tutorRouter.route("/signup").post(authController.signup);
tutorRouter.route("/login").post(authController.login);

module.exports = tutorRouter;
