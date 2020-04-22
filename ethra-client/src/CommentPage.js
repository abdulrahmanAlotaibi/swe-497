import React, { Component } from "react";
import axios from "axios";
import { IoIosChatbubbles } from "react-icons/io";
import LoadingSpinner from "./components/LoadingSpinner";
import "./styles/CommentPage.scss";
export default class extends Component {
  state = {
    rootComment: {},
    rootId: "",
    replies: [],
    text: "",
    loading: true,
  };
  componentDidMount() {
    console.log("comment mounted");
    this.fetchComment();
  }
  componentDidUpdate(preProps) {
    if (preProps.match.params.id !== this.props.match.params.id) {
      this.fetchComment();
    }
  }
  fetchComment = async () => {
    const res = await axios.get(
      `https://ethra.herokuapp.com/course/comments/${this.props.match.params.id}`
    );
    let replies = res.data.data.replies;
    replies = replies.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      rootId: res.data.data.rootComment._id,
      rootComment: res.data.data.rootComment,
      replies,
      loading: false,
    });
  };

  replyToComment = (id) => {
    this.props.history.push(`/comment/${id}`);
    this.setState({
      rootId: id,
    });
  };

  handleInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ text: value });
  };

  handleQuestionSubmit = async () => {
     const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    try {
      const { text } = this.state;
      const author = name
      const { id } = this.props.match.params;
      const newComment = await axios.post(
        `https://ethra.herokuapp.com/course/videos/reply/post-comment/${id}`,
        {
          author,
          text,
          isRoot: false,
          repliesId: [],
        }
      );
      const newCommentsList = [...this.state.replies];
      newCommentsList.unshift(newComment.data.data);
      this.setState({
        replies: newCommentsList,
        text: "",
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  render() {
    const { rootComment, replies, loading, text } = this.state;
    if (loading) {
      return <LoadingSpinner />;
    }
    const renderedReplies = replies.map((reply) => (
      <li className="qa__item" key={reply._id}>
        <div>
          <span className="qa__author">{reply.author}</span>
          <span className="qa__comment">{reply.text}</span>
          <div
            className="qa__reply-icon-container"
            onClick={this.replyToComment.bind(this, reply._id)}
          >
            <IoIosChatbubbles className="qa__reply-icon" />
            <span className="replies-list-span">reply</span>
            <span className="replies-list-numbers">{`replies: ${reply.repliesId.length}`}</span>
          </div>
        </div>
      </li>
    ));
    return (
      <section className="comment">
        <div>
          <span className="comment__author">{rootComment.author}</span>
          <p className="comment__text">{rootComment.text}</p>
        </div>
        <div className="reply">
          <label className="reply__label">Add Reply</label>
          <textarea
            className="reply__input"
            value={text}
            type="text"
            onChange={this.handleInputChange}
          />
          <button className="reply__submit" onClick={this.handleQuestionSubmit}>
            Reply
          </button>
        </div>
        <div className="qa">
          <ul className="qa__list">{renderedReplies}</ul>
        </div>
      </section>
    );
  }
}
