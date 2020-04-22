import React, { Component } from "react";
import { IoIosChatbubbles } from "react-icons/io";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./styles/StreamDashboard.scss";
import LoadingSpinner from "./components/LoadingSpinner";

class CommentList extends Component {
  state = {
    comments: [],
    text: "",
    loading: true,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://ethra.herokuapp.com/course/${this.props.match.params.id}/comments`
      );
      let comments = res.data.data;
      comments = comments
        .filter((comment) => comment.isRoot)
        .sort((a, b) => b.createdAt - a.createdAt);
      this.setState({ comments, loading: false });
    } catch (err) {
      console.log(err);
      // console.log('ho',err.response.data.message);
    }
  };

  handleInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ text: value });
  };

  replyToComment = (id) => {
    return this.props.history.push(`/comment/${id}`);
  };

  handleQuestionSubmit = async () => {
    try {
      const { text } = this.state;
      const { author } = this.props;
      const { id } = this.props.match.params;
      const newComment = await axios.post(
        `https://ethra.herokuapp.com/course/videos/${id}/post-comment/root`,
        {
          author,
          text,
          isRoot: true,
          repliesId: [],
        }
      );
      const newCommentsList = [...this.state.comments];
      newCommentsList.unshift(newComment.data.data);
      this.setState({
        comments: newCommentsList,
        text: "",
      });
    } catch (err) {
      // console.log(err);
      console.log(err.response.data.message);
    }
  };
  render() {
    const { comments, loading, text } = this.state;
    console.log(comments, loading);
    if (loading) {
      return <LoadingSpinner />;
    }
    console.log("hhh", comments);
    const renderedComments = comments.map((comment) => (
      <li className="qa__item" key={comment._id}>
        <span className="qa__author">{comment.author}</span>
        <p className="qa__comment">{comment.text}</p>
        <div>
          {/* <span className="qa__replies">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            exercitationem blanditiis ea sequi totam minima praesentium, fuga
            quasi suscipit tempore porro iusto labore, placeat deleniti
            quibusdam sapiente voluptatem iure fugiat?
          </span> */}
          <div
            className="qa__reply-icon-container"
            onClick={this.replyToComment.bind(this, comment._id)}
          >
            <IoIosChatbubbles className="qa__reply-icon" />
            <span>reply</span>
            <span>{`replies: ${comment.repliesId.length}`}</span>
          </div>
        </div>
      </li>
    ));
    return (
      <section className="qa">
        <div className="qa__create">
          <label className="qa__label">Ask A New Question</label>
          <input
            className="qa__input"
            value={text}
            type="text"
            onChange={this.handleInputChange}
          />
          <button className="qa__submit" onClick={this.handleQuestionSubmit}>
            Submit
          </button>
        </div>
        <ul className="qa__list">{renderedComments}</ul>
      </section>
    );
  }
}

export default withRouter(CommentList);
