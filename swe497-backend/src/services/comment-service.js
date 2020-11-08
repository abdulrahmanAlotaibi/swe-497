const Comment = require("../models/Comment");

exports.createComment = async (commentData, course, video) => {
  try {
    const newComment = await Comment.create({ ...commentData, course, video });
    return newComment;
  } catch (err) {}
};

// reference : video ref or course ref
exports.getAllComments = async (reference) => {
  try {
    const comments = await Comment.find({ [reference.key]: reference.value });

    return comments;
  } catch (error) {}
};

exports.getComment = async (reference) => {};

exports.deleteComment = async (reference) => {};

exports.updateComment = async (reference) => {};

exports.replyToComment = async (reference) => {};
