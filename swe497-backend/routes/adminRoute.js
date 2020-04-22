const express = require("express");
const authController = require("../controllers/auth");
const courseController = require("../controllers/course");
const studentController = require("../controllers/student");
const tutorController = require("../controllers/tutor");
const adminController = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.route("/courses").get(adminController.getCourses);
adminRouter.route("/students").get(adminController.getStudents);
adminRouter.route("/tutors").get(adminController.getTutors);

adminRouter.route("/delete-course/:id").delete(adminController.deleteCourse);

adminRouter
  .route("/suspend-course/:id")
  .patch(adminController.toggleCourseSuspinsion);

adminRouter
  .route("/ban/students/:id")
  .patch(adminController.toggleStudentBannation);

adminRouter.route("/ban/tutors/:id").patch(adminController.toggleTutorBannation);

// adminRouter.route("/statistics").get(adminRouter.getStatistic);

module.exports = adminRouter;
