import React, { Component } from "react";
import axios from "axios";
import "./styles/DashboardTutor.scss";
import { Link } from "react-router-dom";
import { MdModeEdit, MdAddCircleOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import LoadingSpinner from "./components/LoadingSpinner";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
console.log(history.location.pathname);
export default class DashboardTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
    this.getCourses = this.getCourses.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  async getCourses() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    try {
      const res = await axios.get(`https://ethra.herokuapp.com/tutor/courses`, {
        headers: { authorization: `Bearer ${token}` }
      });
      const courses = [...res.data.data].filter(course => !course.isSuspended);
      this.setState(() => {
        return { courses: courses };
      });
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    if (!this.state.courses) {
      return <LoadingSpinner />;
    }

    const renderedCourses = this.state.courses
      .filter(course => course.type === "course")
      .map(course => (
        <div key={course._id}>
          <li key={course._id} className="tutor-courses__item">
            <span className="tutor-courses__name">{course.name}</span>
            <span className="tutor-courses__edit-btn">
              <Link to={`/course-modification/${course._id}`}>
                <MdModeEdit />
              </Link>
            </span>
          </li>
          <div style={{ display: "flex" }}>
            <Link
              style={{ marginRight: "1.5rem" }}
              to={`/my-courses/${course._id}`}
              className="stream-btn"
            >
              Go To Course
            </Link>
            <Link to={`/course-manager/${course._id}`} className="stream-btn">
              Manage
            </Link>
          </div>
        </div>
      ));
    const renderedTopics = this.state.courses
      .filter(course => course.type === "topic")
      .map(course => (
        <div key={course._id} className="">
          <li key={course._id} className="tutor-courses__item">
            <span className="tutor-courses__name">{course.name}</span>
            <span className="tutor-courses__edit-btn">
              <Link to={`/topic-modification/${course._id}`}>
                <MdModeEdit />
              </Link>
            </span>
          </li>
          <div style={{ display: "flex" }}>
            <Link
              style={{ marginRight: "1.5rem" }}
              to={`/my-topics/${course._id}`}
              className="stream-btn"
            >
              Go To Topic
            </Link>
            <Link to={`/topic-manager/${course._id}`} className="stream-btn">
              Manage
            </Link>
          </div>
        </div>
      ));

    return (
      <section className="dashboard-tutor-page">
        <div className="dashboard-tutor">
          <div className="tutor-courses">
            <h2 className="tutor-courses__primary-heading">
              Courses Dashboard
            </h2>
            <ul className="tutor-courses__list">{renderedCourses}</ul>
            <h2
              className="tutor-courses__primary-heading"
              style={{ marginTop: "13rem" }}
            >
              Topics Dashboard
            </h2>
            <ul className="tutor-courses__list">{renderedTopics}</ul>

            <Link to="/create-course" className="create-course-btn">
              Create Course
            </Link>
            <Link to="/create-topic" className="create-course-btn">
              Create Topic
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
