import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import "./styles/CreateCourse.scss";

export default class extends Component {
  state = {
    course: {},
  };
  async componentDidMount() {
    const url = window.location.href.split("/");
    const id = url[4];
    try {
      const res = await axios.get(`https://ethra.herokuapp.com/course/${id}`);
      const { course } = res.data.data;
      console.log(course);
      this.setState({
        course: course,
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  handleFileChange = (evt) => {
    const { files } = evt.target;
    const newCourse = { ...this.state.course };
    newCourse.img = files[0];
    newCourse.imgPath = files[0].path;
    this.setState(() => ({
      course: newCourse,
    }));
  };

  handleInputChange = (evt) => {
    const { value, id } = evt.target;
    const newCourse = { ...this.state.course };
    newCourse[id] = value;
    this.setState(() => ({
      course: newCourse,
    }));
  };

  handleSubmit = async (evt) => {
    const url = window.location.href.split("/");
    const id = url[4];
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const {
        name,
        img,
        price,
        description,
        startDate,
        category,
        institution,
        chapters,
      } = this.state.course;
      const fd = new FormData();
      const formattedChapters = JSON.stringify(chapters);
      fd.append("photo", img);
      fd.append("name", name);
      fd.append("price", price);
      fd.append("description", description);
      fd.append("startDate", startDate);
      fd.append("category", category);
      fd.append("institution", institution);
      fd.append("chapters", formattedChapters);
      await axios.patch(
        `https://ethra.herokuapp.com/course/${id}/course-modefication`,
        fd,
        { headers: { authorization: `Bearer ${token}` } }
      );
      this.props.history.push("/dashboard-tutor");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  handleChapterChange = (evt) => {
    const { name, value } = evt.target;
    const newCourse = { ...this.state.course };
    const { chapters } = newCourse;
    const newChapters = [...chapters];
    newChapters[name * 1].value = value;
    newCourse.chapters = newChapters;
    this.setState(() => ({
      course: newCourse,
    }));
  };

  handleTopicChange = (evt) => {
    const topic = evt.target;
    console.log(topic.id);

    const topicChapter = topic.name;
    const topicName = topic.value;
    const newCourse = { ...this.state.course };
    const { chapters } = newCourse;

    const newChapterTopics = chapters[topicChapter].topics.map((t) => {
      console.log("---", t.id, topic.id);

      if (topic.id == t.id) {
        return { name: topicChapter, id: topic.id, value: topicName };
      }
      return t;
    });

    const newChapters = chapters.map((chapter, i) => {
      if (topicChapter == i) {
        return {
          name: chapter.name,
          value: chapter.value,
          topics: newChapterTopics,
        };
      }
      return chapter;
    });
    console.log(chapters);
    newCourse.chapters = newChapters;
    this.setState({ course: newCourse });
  };

  deletTopic = (chidx, tidx) => {
    const newCourse = { ...this.state.course };
    newCourse.chapters[chidx].topics.splice(tidx, 1);
    this.setState({ course: newCourse });
  };

  deleteChapter = (chidx) => {
    const newCourse = { ...this.state.course };
    newCourse.chapters.splice(chidx, 1);
    this.setState({ course: newCourse });
  };
  addTopic = (evt) => {
    evt.preventDefault();
    const chapterIndex = evt.target.id;
    console.log(chapterIndex);
    const newCourse = { ...this.state.course };
    const newChapters = newCourse.chapters.map((chapter, i) => {
      if (i == chapterIndex) {
        const newChapter = {
          index: i,
          name: chapter.name,
          value: chapter.value,
          topics: [
            ...chapter.topics,
            {
              name: i,
              id: uuidv4(),
              value: "",
            },
          ],
        };
        return newChapter;
      }
      return chapter;
    });
    newCourse.chapters = newChapters;
    // this.setState({ chapters: newChapters });
    this.setState({ course: newCourse });
  };

  addChapter = (evt) => {
    evt.preventDefault();
    const { chapters } = this.state.course;
    const newChapter = {
      name: chapters.length + 1,
      value: "",
      topics: [{ name: chapters.length + 1, id: uuidv4() }],
    };
    chapters.push(newChapter);
    this.setState(() => ({
      chapters,
    }));
  };

  render() {
    if (Object.keys(this.state.course).length === 0) {
      return <h1>Loading...</h1>;
    }
    const {
      name,
      description,
      price,
      startDate,
      category,
      chapters,
      institution,
    } = this.state.course;
    const renderedChapters = chapters.map((chapter, i, ar) => {
      const topics = chapter.topics;
      const renderedTopics = topics.map((topic, ti) => {
        return (
          <div>
            <label className="form__label" htmlFor={topic.id}>
              Topic Name:
            </label>
            <div style={{ display: "block" }}>
              <input
                className="form__input"
                name={i}
                id={topic.id}
                value={topic.value}
                onChange={this.handleTopicChange}
              />
              <IoIosTrash
                style={{ cursor: "pointer" }}
                onClick={this.deletTopic.bind(this, i, ti)}
              />
            </div>
          </div>
        );
      });
      return (
        <div
          onSubmit={this.addTopic}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "16px",
            paddingBottom: "16px",
          }}
        >
          <label className="form__label" htmlFor={i}>
            Chapter Name:
          </label>
          <div style={{ display: "block" }}>
            <input
              className="form__input"
              name={i}
              id={i}
              value={chapter.value}
              // value={chapter.name}
              onChange={this.handleChapterChange}
            />
            <IoIosTrash
              style={{ cursor: "pointer" }}
              onClick={this.deleteChapter.bind(this, i)}
            />
          </div>
          {renderedTopics}
          <span
            style={{
              display: "block",
              color: "#3722d3",
              padding: "4px",
              margin: "8px",
              cursor: "pointer",
            }}
            id={i}
            name={i}
            onClick={this.addTopic}
          >
            Add Topic
          </span>
        </div>
      );
    });
    return (
      <div className="profile">
        <form className="profile-form">
          <input
            type="file"
            // accept="image/*"
            name="photo"
            onChange={this.handleFileChange}
          />
          <label className="profile-form__label" htmlFor="name">
            Name:
          </label>
          <input
            className="profile-form__input"
            value={name}
            type="text"
            id="name"
            onChange={this.handleInputChange}
            required
          />
          <label className="profile-form__label" htmlFor="description">
            Description:
          </label>
          <input
            className="profile-form__input"
            type="text"
            id="description"
            value={description}
            onChange={this.handleInputChange}
            required
          />
          <section className="">{renderedChapters}</section>
          <ul className="create-course__syllable-options">
            <li
              className="create-course__syllable-add-chapter"
              onClick={this.addChapter}
            >
              Add A Chapter
            </li>
          </ul>
          <label className="profile-form__label" htmlFor="price">
            Price:
          </label>
          <input
            className="profile-form__input"
            type="number"
            id="price"
            value={price}
            onChange={this.handleInputChange}
            required
          />
          <label className="profile-form__label" htmlFor="startDate">
            Start Date:
          </label>
          <input
            type="date"
            className="profile-form__input"
            value={startDate}
            required
            id="startDate"
            onChange={this.handleInputChange}
          />
          <label className="profile-form__label" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="profile-form__input"
            value={category}
            onChange={this.handleInputChange}
            required
          />
          <label className="profile-form__label" htmlFor="institution">
            Institution:
          </label>
          <input
            type="text"
            className="profile-form__input"
            id="institution"
            onChange={this.handleInputChange}
            value={institution}
            required
          />
          <input
            className="profile-form__submit"
            type="button"
            onClick={this.handleSubmit}
            value="Save"
          />
        </form>
      </div>
    );
  }
}
