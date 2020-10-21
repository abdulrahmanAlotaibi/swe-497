import React, { Component } from "react";
import axios from "axios";
import Course from "components/course/Course";
import "./Search.scss";
import "components/course/Course.scss";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      name: "",
      type: "course",
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState(() => {
      return { name: value };
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    console.table([this.state.type, this.state.name])
    try {
      const res = await axios.get(
        `http://localhost:8000/search?name=${this.state.name}&type=${this.state.type}`
      );
      for (const course of res.data.data) {
        const formattedImage = `http://localhost:8000/${course.img}`;
        course.img = formattedImage;
      }
      const courses = [...res.data.data].filter(
        (course) => !course.isSuspended
      );
      this.setState(() => {
        return { courses, isLoading: false };
      });
    } catch (e) {
      this.setState({ isLoading: false });
      console.log(e);
    }
  }

  handleTypeChange(evt) {
    this.setState({
      type: evt.target.value,
    });
  }
  render() {
    const renderedCourses = this.state.courses.map((course) => {
      return <Course key={course._id} course={course} />;
    });
    return (
      <main className="search">
        <form onSubmit={this.handleSubmit} className="search__form">
          <input
            type="text"
            value={this.state.name}
            placeholder="Type name here"
            onChange={(e) => this.handleChange(e)}
            className="search__input"
          />
          <ul className="search__radio-list">
            <li>
              <label>
                <input
                  type="radio"
                  value="course"
                  checked={this.state.type === "course"}
                  onChange={this.handleTypeChange}
                  className="search__radio"
                />
                <span>Search by course</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="tutor"
                  checked={this.state.type === "tutor"}
                  onChange={this.handleTypeChange}
                  className="search__radio"
                />
                <span>Search by tutor</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="topic"
                  checked={this.state.type === "topic"}
                  onChange={this.handleTypeChange}
                  className="search__radio"
                />
                <span>Search by topic</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  value="city"
                  checked={this.state.type === "city"}
                  onChange={this.handleTypeChange}
                  className="search__radio"
                />
                <span>Search by city</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  value="institution"
                  checked={this.state.type === "institution"}
                  onChange={this.handleTypeChange}
                  className="search__radio"
                />
                <span>Search by institution</span>
              </label>
            </li>
          </ul>
          {/* <div className="search__catagory">
            <span className="search__catagory-icon"></span>
            <span className="search__catagory-text">Catagories</span>
          </div> */}
          <button className="search__submit">Search</button>
        </form>
        <section className="courses">
          <h2 className="courses__primary-heading">Courses:</h2>
          {this.state.isLoading ? (
            <LoadingSpinner />
          ) : (
            <ul className="courses__list">{renderedCourses}</ul>
          )}
        </section>
      </main>
    );
  }
}

export default Search;
