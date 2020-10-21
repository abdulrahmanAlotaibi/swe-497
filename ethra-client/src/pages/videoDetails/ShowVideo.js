import React, { Component } from "react";
import axios from "axios";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
import CommentsList from "components/commentList/CommentsList";
import "./ShowVideo.scss";
import { v4 as uuidv4 } from "uuid";
import StudentCourses from "pages/course/StudentCourses";
import { Redirect } from "react-router-dom";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: "",
      comments: [],
      isLoading: true,
      isEmpty: false,
    };
    this.getVideos = this.getVideos.bind(this);
  }
  componentDidMount() {
    this.getMembership();
    this.getVideos();
  }

  async getMembership() {
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    //Course Id
    const courseId = this.props.match.params.id;
    console.log(courseId);
    if (!(role && token)) {
      return this.props.history.push(`/course/${courseId}`);
    }

    if (role === "admin") {
      this.setState({ isMember: true });
      return;
    }

    try {
      if (role === "student") {
        const res = await axios.get(
          `http://localhost:8000/student/${id}`
        );
        const studentCoursesId = res.data.data.courses;
        const member = studentCoursesId.find((cId) => cId === courseId);
        console.log(member);

        if (member) {
          this.setState({ isMember: true });
          return;
        } else {
          console.log("wqodjefiepihjew");
          return this.props.history.push(`/course/${courseId}`);
        }
      } else if (role === "tutor") {
        const courseTutor = await axios.get(
          `http://localhost:8000/course/${courseId}`
        );

        // Author id of course
        const courseTutorId = courseTutor.data.data.course.tutor;

        if (courseTutorId !== id) {
          return this.props.history.push(`/course/${courseId}`);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  getVideos = async () => {
    try {
      const { id } = this.props.match.params;
      const res = await axios.get(
        `http://localhost:8000/course/${id}/videos`
      );
      let videos = res.data.data;

      for (let i = 0; i < videos.length; i++) {
        videos[i].content = `http://localhost:8000/${videos[i].content}`;
      }

      console.log(res.data.data);

      this.setState({
        videos,
        isLoading: false,
        selectedVideo: videos[0],
        isEmpty: false,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      console.log(err.message);
    }
  };
  render() {
    const { token, role, name, isBanned, id } = JSON.parse(
      window.localStorage.getItem("account")
    );
    if (!(role && token)) {
      return <Redirect to="/signin" />;
    }

    const { videos, isLoading, selectedVideo, isEmpty } = this.state;
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (videos.length === 0) {
      return (
        <main>
          <div>
            <h1>Empty</h1>
          </div>
        </main>
      );
    }
    const renderedVideos = videos.map((video) => {
      return (
        <li
          key={video._id}
          onClick={() => this.setState({ selectedVideo: video })}
        >
          {video.title}
        </li>
      );
    });
    return (
      <main>
        <div className="videos">
          <div className="videos__options">
            <ul className="videos__list">{renderedVideos}</ul>
          </div>
          <div className="videos__selected-video">
            {/* <h1 className="video__name">{video.title}</h1> */}
            <video className="video__player" key={uuidv4()} controls>
              <source src={selectedVideo.content} />
            </video>
          </div>
        </div>
        <section className="comments-section">
          <div className="comments">
            <h2 className="comments__primary-heading"> Comments Section</h2>
            <CommentsList author={name} />
          </div>
        </section>
      </main>
    );
  }
}
