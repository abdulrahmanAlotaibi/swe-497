import React, { Component } from "react";
import axios from "axios";
import "./styles/VisitorTutorProfile.scss";
import "./styles/Course.scss";
import { getUrlId } from "./util/helpers";
// import "../styles/Course.scss"
import Course from "./components/Course";
export default class VisitorTutorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor: {},
      courses: []
    };
  }

  componentDidMount() {
    // TODO
    this.getCourses();
  }
  async getCourses() {
    try {
      const id = getUrlId(); // TODO take tutor's ID as a prop from search for a tutor page
      const res = await axios.get(`https://ethra.herokuapp.com/tutor/${id}`);
      for (const course of res.data.data.courses) {
        const formattedImage = `https://ethra.herokuapp.com/${course.img}`;
        course.img = formattedImage;
      }
      this.setState(() => {
        return { courses: res.data.data.courses, tutor: res.data.data.tutor };
      });
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    const renderedCourses = this.state.courses.map(course => {
      return (
        <>
          <Course tutorName={this.state.tutor.name} course={course} />
        </>
      );
    });
    return (
      <section className="visitor-tutor-section">
        <div className="visitor-tutor">
          <span className="visitor-tutor__name">{this.state.tutor.name}</span>
          <p className="visitor-tutor__description">
            {this.state.tutor.qualifications}
          </p>
          <h2 className="visitor-tutor__courses-heading">Courses</h2>
          <ul className="courses__list">{renderedCourses}</ul>
        </div>
      </section>
    );
  }
}
