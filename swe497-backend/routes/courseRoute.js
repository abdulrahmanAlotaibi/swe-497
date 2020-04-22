const express = require("express");
const authController = require("../controllers/auth");
const courseController = require("../controllers/course");
const studentController = require("../controllers/student");
const tutorController = require("../controllers/tutor");
const commentController = require("../controllers/comment");

const courseRouter = express.Router();

courseRouter.route("/").get(courseController.getCoursesForAdmin);

courseRouter
  .route("/:id/add-to-cart")
  .post(authController.protect("student"), courseController.addToCart);

courseRouter
  .route("/:id/add-review")
  .post(authController.protect("student"), courseController.addReview);

courseRouter.route("/videos/update").patch(courseController.updateVideos);
courseRouter.route("/:id/videos").get(courseController.getVideos);
courseRouter.route("/videos/:id").get(courseController.getVideo);
courseRouter.route("/videos/:id").delete(courseController.deleteVideo);
courseRouter
  .route("/:id/upload-video")
  .post(courseController.uploadCourseVideo, courseController.pushCourseVideo);
courseRouter
  .route("/cart/:id")
  .delete(
    authController.protect("student"),
    courseController.deleteCourseFromCart
  );

courseRouter
  .route("/cart")
  .get(authController.protect("student"), courseController.getCart);

courseRouter.route("/:id").get(courseController.getCourse);

courseRouter
  .route("/create-course")
  .post(
    authController.protect("tutor"),
    courseController.uploadCourseImage,
    courseController.createCourse
  );

courseRouter
  .route("/:id/course-modefication")
  .patch(
    authController.protect("tutor"),
    courseController.uploadCourseImage,
    courseController.modefiyCourse
  );

courseRouter
  .route("/courses/:category")
  .get(courseController.getCourseByCategory);

courseRouter.route("/:id/comments").get(commentController.getComments);

courseRouter.route("/comments/:id").get(commentController.getComment);

courseRouter
  .route("/videos/:videoId/post-comment/:parentId")
  .post(commentController.postComment);

module.exports = courseRouter;
