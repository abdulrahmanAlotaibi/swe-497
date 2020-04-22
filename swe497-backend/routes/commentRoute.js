const express = require("express");
const authController = require("../controllers/auth");
const courseController = require("../controllers/course");
const studentController = require("../controllers/student");
const tutorController = require("../controllers/tutor");
const commentController = require("./commentController");

const commentRouter = express.Router();

commentRouter.route("/:id/get-comment").get(commentController.getComment);
commentRouter.route("/:id/get-comments").get(commentController.getComments);
commentRouter.route("/:id");
commentRouter.route("/:id/post-comment").post(commentRouter.postComment);

module.exports = commentRouter;
