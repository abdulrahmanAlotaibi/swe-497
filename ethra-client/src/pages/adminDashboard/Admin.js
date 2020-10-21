import React, { Component } from "react";
import axios from "axios";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
import "./Admin.scss";

export default class extends Component {
  state = {
    type: "courses",
    courses: [],
    students: [],
    tutors: [],
    noStudents: 0,
    noCourses: 0,
    noTutors: 0,
    loading: true,
  };

  componentDidMount() {
    this.getData();
  }

  deleteCourse = async (id, i) => {
    try {
      await axios.delete(`http://localhost:8000/admin/delete-course/${id}`);
      const newCourses = [...this.state.courses];
      newCourses.splice(i, 1);
      this.setState({ courses: newCourses });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  toggleSuspention = async (id, i) => {
    try {
      const { courses } = this.state;
      await axios.patch(`http://localhost:8000/admin/suspend-course/${id}`);
      const newCourses = [...courses];
      newCourses[i].isSuspended = !courses[i].isSuspended;
      this.setState({ courses: newCourses });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  toggleBannation = async (id, i) => {
    try {
      const { type } = this.state;
      await axios.patch(`http://localhost:8000/admin/ban/${type}/${id}`);
      const persons = [...this.state[type]];
      persons[i].isBaned = !this.state[type][i].isBaned;
      this.setState({ [type]: persons });
    } catch (err) {
      console.log(err);
      // console.log(err.response.data.message);
    }
  };

  getData = async () => {
    const students = await axios.get("http://localhost:8000/admin/students");
    const tutors = await axios.get("http://localhost:8000/admin/tutors");
    const courses = await axios.get("http://localhost:8000/admin/courses");
    console.log(students, tutors, courses);

    this.setState(() => ({
      students: students.data.data,
      courses: courses.data.data,
      tutors: tutors.data.data,
      noStudents: students.data.data.length,
      noCourses: courses.data.data.length,
      noTutors: tutors.data.data.length,
      loading: false,
    }));
  };

  handleTypeChange = (type) => {
    this.setState({
      type: type,
    });
  };

  render() {
    const {
      tutors,
      noStudents,
      noCourses,
      noTutors,
      type,
      loading,
    } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    let dashbord;

    if (this.state[type].length === 0) {
      dashbord = <span>{`There are no ${type}`}</span>;
    } else {
      dashbord = this.state[type].map((data, i) => {
        let controlsContent;
        if (type === "courses") {
          controlsContent = (
            <>
              <button onClick={this.deleteCourse.bind(this, data._id, i)}>
                Delete
              </button>
              <button onClick={this.toggleSuspention.bind(this, data._id, i)}>
                {data.isSuspended ? "Unsuspend" : "Suspend"}
              </button>
            </>
          );
        } else {
          controlsContent = (
            <button onClick={this.toggleBannation.bind(this, data._id, i)}>
              {data.isBaned ? "Unband" : "Band"}
            </button>
          );
        }
        return (
          <li key={data._id} className="admin__courses-item">
            <span className="admin__courses-name">{data.name}</span>
            <span className="admin__courses-control-btn">
              {controlsContent}
            </span>
          </li>
        );
      });
    }
    return (
      <main className="admin-page">
        <div className="admin">
          <h2 className="admin__stats-primary-heading">Dashboard Stats </h2>
          <ul className="admin__stats">
            <li>
              <div>
                <span className="admin__stats-name">Number of Courses:</span>
                <span className="admin__stats-number">{noCourses}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="admin__stats-name">Number of Tutors:</span>
                <span className="admin__stats-number"> {noTutors}</span>
              </div>
            </li>
            <li>
              <div>
                <span className="admin__stats-name">Number of Students:</span>
                <span className="admin__stats-number">{noStudents}</span>
              </div>
            </li>
          </ul>

          <h2 className="admin__primary-heading">Admin Dashboard</h2>

          <ul className="admin__radio-list">
            <li>
              <button onClick={() => this.handleTypeChange("courses")}>
                Courses
              </button>
              {/* <label>
                  <input
                    style={{ display: "block" }}
                    type="radio"
                    value="courses"
                    checked={this.state.type === "courses"}
                    onChange={this.handleTypeChange}
                    className="search__radio"
                  />
                  <span>All courses</span>
                </label> */}
            </li>

            <li>
              <button onClick={() => this.handleTypeChange("tutors")}>
                Tutors
              </button>

              {/* <label>
                  <input
                    style={{ display: "block" }}
                    type="radio"
                    value="tutors"
                    checked={this.state.type === "tutors"}
                    onChange={this.handleTypeChange}
                    className="search__radio"
                  />
                  <span>All tutors</span>
                </label> */}
            </li>

            <li>
              <button onClick={() => this.handleTypeChange("students")}>
                Students
              </button>
              {/* <label>
                  <input
                    style={{ display: "block" }}
                    type="radio"
                    value="students"
                    checked={this.state.type === "students"}
                    onChange={this.handleTypeChange}
                    className="search__radio"
                  />
                  <span>All students</span>
                </label> */}
            </li>
          </ul>

          <ul className="admin__courses">{dashbord}</ul>
        </div>
      </main>
    );
  }
}
