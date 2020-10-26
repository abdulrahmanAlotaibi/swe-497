const express = require("express");

const commentController = require("./commentController");

const commentRouter = express.Router();

commentRouter.route("/:id/get-comment").get(commentController.getComment);
commentRouter.route("/:id/get-comments").get(commentController.getComments);
commentRouter.route("/:id");
commentRouter.route("/:id/post-comment").post(commentRouter.postComment);

module.exports = commentRouter;
