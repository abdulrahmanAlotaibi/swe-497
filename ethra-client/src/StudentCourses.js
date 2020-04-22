import React, { Component } from "react";
import "./styles/StudentCourses.scss";
import Course from "./components/Course";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentCourse from "./StudentCourse";
class StudentCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isLoading: true,
      isRating: false,
      ratingNumber: 0,
      textReview: "",
      selectedCourse: "",
      isCompleted: false
    };
    this.getStudentCourses = this.getStudentCourses.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.cancelReview = this.cancelReview.bind(this);
    this.handleChangeTextReview = this.handleChangeTextReview.bind(this);
    this.handleChangeRatingNumber = this.handleChangeRatingNumber.bind(this);
  }

  async handleSubmitReview() {
    const token = JSON.parse(window.localStorage.getItem("token"));

    const { ratingNumber, textReview, selectedCourse } = this.state;
    // if (1 <= ratingNumber && ratingNumber <= 5) return;
    if (1 > ratingNumber && ratingNumber > 5) return;
    try {
      const res = await axios.post(
        `https://ethra.herokuapp.com/course/${selectedCourse._id}/add-review`,
        {
          text: textReview,
          rating: ratingNumber
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({
        isCompleted: true,
        isRating: false,
        ratingNumber: 0,
        textReview: ""
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  handleChangeTextReview(evt) {
    const value = evt.target.value;
    this.setState({ textReview: value });
  }

  handleChangeRatingNumber(evt) {
    const number = parseInt(evt.target.value);
    if (1 <= number <= 5) this.setState({ ratingNumber: number });
  }
  cancelReview() {
    this.setState({ isRating: false });
  }
  handleAddReview(course) {
    console.log(course);
    this.setState({
      selectedCourse: course,
      isRating: true,
      isCompleted: false
    });
  }
  componentDidMount() {
    this.getStudentCourses();
  }

  async getStudentCourses() {
    // Todo
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      // const role = JSON.parse(window.localStorage.getItem("role"));

      const res = await axios.get("https://ethra.herokuapp.com/student/courses", {
        headers: { authorization: `Bearer ${token}` }
      });
      for (const course of res.data.data) {
        const formattedImage = `https://ethra.herokuapp.com/${course.img}`;
        course.img = formattedImage;
      }
      const courses = [...res.data.data].filter(course => !course.isSuspended);
      this.setState({ courses, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const role = JSON.parse(window.localStorage.getItem("role"));

    if (!(role && token)) {
      return <Redirect to="/signin" />;
    }

    const { courses, isLoading } = this.state;
    if (isLoading) return <LoadingSpinner />;
    if (courses.filter(course => course.type === "course").length === 0) {
      return <h2>There are no courses</h2>;
    }
    const renderedCourses = this.state.courses
      .filter(course => course.type === "course")
      .map(course => {
        return (
          <>
            <StudentCourse course={course} owned={true} />
          </>
        );
      });

    const renderedRatings = this.state.courses
      .filter(course => course.type === "course")
      .map(course => {
        return (
          <li
            className="courses-rating-item"
            key={course._id}
            onClick={() => this.handleAddReview(course)}
          >
            <span className="courses-rating-name">{course.name}</span>
            <button className="courses-rating-rate">Rate</button>
          </li>
        );
      });

    return (
      <section className="student-courses-section">
        <h2 className="student-courses-section__primary-heading">My Courses</h2>

        <section className="courses-rating">
          <div className="courses-rating-left">
            <h3>Leave a rating:</h3>
            <ul className="courses-rating-list">{renderedRatings}</ul>
          </div>
          {this.state.isCompleted && (
            <h3 style={{ textAlign: "center", flexBasis: "70%" }}>Thanks</h3>
          )}
          {this.state.isRating && (
            <div className="courses-rating-right">
              <h3>
                {this.state.selectedCourse && this.state.selectedCourse.name}
              </h3>
              <form
                className="courses-rating-right-form"
                onSubmit={evt => evt.preventDefault()}
              >
                <label className="courses-rating-right-label" htmlFor="">
                  Text Review
                </label>
                <textarea
                  className="courses-rating-right-textarea"
                  value={this.state.textReview}
                  onChange={this.handleChangeTextReview}
                />
                <label className="courses-rating-right-label" htmlFor="">
                  How Many Stars:
                </label>
                <input
                  className="courses-rating-right-number"
                  type="number"
                  value={this.state.ratingNumber}
                  onChange={this.handleChangeRatingNumber}
                  min="1"
                  max="5"
                />
                <div className="courses-rating-right-btn-container">
                  <button
                    className="courses-rating-right-submit"
                    onClick={this.handleSubmitReview}
                  >
                    Submit
                  </button>
                  <button
                    className="courses-rating-right-cancel"
                    onClick={this.cancelReview}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
        <div className="student-courses">
          {courses.length === 0 ? (
            <h3>Empty</h3>
          ) : (
            <ul className="courses__list">{renderedCourses}</ul>
          )}
        </div>
      </section>
    );
  }
}

export default StudentCourses;
