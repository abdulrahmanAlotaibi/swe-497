const Comment = require("../model/comments");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.id });
    res.status(200).json({
      status: "success",
      data: comments
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const rootComment = await Comment.findById(req.params.id);
    const { repliesId } = rootComment;
    const replies = [];
    for (const id of repliesId) {
      replies.push(await Comment.findById(id));
    }
    res.status(200).json({
      status: "success",
      data: {
        rootComment,
        replies
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { videoId, parentId } = req.params;
    const newComment = await Comment.create({ ...req.body, video: videoId, createdAt: Date.now() });
    if (parentId !== "root") {
      const parentComment = await Comment.findById(parentId);
      const newRepliesArr = [...parentComment.repliesId];
      newRepliesArr.push(newComment._id);
      parentComment.repliesId = newRepliesArr;
      await parentComment.save({ validateBeforeSave: false });
    }
    res.status(200).json({
      status: "success",
      data: newComment
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

