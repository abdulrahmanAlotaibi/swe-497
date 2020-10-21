import React from "react";

const Comment = props => {
  const { comment } = props;
  if (comment.parents.length > 0) {
    return comment.parents.map(childComment => (
      <Comment key={childComment._id} comment={childComment} />
    ));
  }
  return (
    <div>
      <span>{`${comment.author}: `}</span>
      <span>{comment.text}</span>
    </div>
  );
};

export default Comment;