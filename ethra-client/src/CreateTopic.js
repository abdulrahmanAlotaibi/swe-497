import React, { Component } from "react";
import "./styles/CreateCourse.scss";
import { v4 as uuidv4 } from "uuid";
import { IoIosTrash } from "react-icons/io";
import axios from "axios";
import { fstat } from "fs";
export default class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: "",
      startDate: "",
      category: "",
      institution: "",
      img: null,
      imgPath: null,
      chapters: [
        {
          index: 1,
          value: "",
          name: 1,
          topics: [
            {
              name: 1,
              id: uuidv4(),
              value: ""
            }
          ]
        }
        // {
        //   index: 2,
        //   value: "",
        //   name: "",
        //   topics: [
        //     {
        //       name: 2,
        //       id: uuid(),
        //       value: ""
        //     }
        //   ]
        // },
        // {
        //   index: 3,
        //   name: "",
        //   topics: [
        //     {
        //       name: 3,
        //       id: uuid(),
        //       value: ""
        //     },
        //     {
        //       name: 3,
        //       id: uuid(),
        //       value: ""
        //     },
        //     {
        //       name: 3,
        //       id: uuid(),
        //       value: ""
        //     }
        //   ]
        // },
        // {
        //   index: 4,
        //   name: "Chapter 4",
        //   topics: [
        //     {
        //       name: 4,
        //       id: uuid(),
        //       value: ""
        //     }
        //   ]
        // }
      ]
    };
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.addChapter = this.addChapter.bind(this);
  }
  handleFileChange = evt => {
    const { files } = evt.target;
    console.log(files[0]);
    this.setState(() => ({
      img: files[0],
      imgPath: files[0].path
    }));
  };

  handleInputChange(evt) {
    const { value, name } = evt.target;
    this.setState(() => ({
      [name]: value
    }));
  }

  async handleSubmit(evt) {
    try {
      // evt.preventDefault();
      // console.log(this.state);
      const token = JSON.parse(window.localStorage.getItem("token"));
      const {
        name,
        img,
        price,
        description,
        startDate,
        category,
        institution,
        chapters
      } = this.state;
      // const formattedChapters = [];
      // for (const chapter of chapters) {
      //   console.log(chapter.value);
      //   formattedChapters.push({
      //     name: chapter.value,
      //     topics: chapter.topics
      //   });
      // }
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
      fd.append("type", JSON.stringify("topic"));

      // const newCourse = {
      //   name,
      //   price,
      //   // photo: img,
      //   description,
      //   startDate,
      //   category,
      //   institution,
      //   chapters
      // };
      await axios.post("https://ethra.herokuapp.com/course/create-course", fd, {
        headers: { authorization: `Bearer ${token}` }
      });
      this.props.history.push("/dashboard-tutor");
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
  deletTopic = (chidx, tidx) => {
    const newChapters = [...this.state.chapters];
    newChapters[chidx].topics.splice(tidx, 1);
    this.setState({ chapters: newChapters });
  };

  deleteChapter = chidx => {
    const newChapters = [...this.state.chapters];
    newChapters.splice(chidx, 1);
    this.setState({ chapters: newChapters });
  };
  handleChapterChange(evt) {
    const { name, value } = evt.target;
    // console.log(value);
    const newChapters = [...this.state.chapters];
    // const chapter = { ...chapters[name * 1] };
    // chapter.value = value;
    // console.log(chapter);
    // chapters[name * 1] = {...chapter};
    newChapters[name * 1].value = value;
    this.setState(() => ({
      chapters: newChapters
    }));
  }

  handleTopicChange(evt) {
    const topic = evt.target;

    const topicChapter = topic.name;
    const topicName = topic.value;
    const { chapters } = this.state;

    const newChapterTopics = chapters[topicChapter].topics.map(t => {
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
          topics: newChapterTopics
        };
      }
      return chapter;
    });

    this.setState({ chapters: newChapters });
  }

  addTopic(evt) {
    evt.preventDefault();
    const chapterIndex = evt.target.id;

    const { chapters } = this.state;
    const newChapters = chapters.map((chapter, i) => {
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
              value: ""
            }
          ]
        };
        return newChapter;
      }
      return chapter;
    });

    this.setState({ chapters: newChapters });
  }

  addChapter(evt) {
    evt.preventDefault();

    const { chapters } = this.state;
    const newChapter = {
      name: chapters.length + 1,
      value: "",
      topics: [{ name: chapters.length + 1, id: uuidv4() }]
    };

    chapters.push(newChapter);
    this.setState(() => ({
      chapters
    }));
    // this.setState({ chapters: [...chapters, newChapter] });
  }
  render() {
    const renderedChapters = this.state.chapters.map((chapter, i, ar) => {
      const topics = chapter.topics;
      const renderedTopics = topics.map((topic, ind) => {
        return (
          <div>
            <label className="form__label" htmlFor={topic.id}>
              Topic Name:
            </label>
            {/* <div style={{ display: "block" }}> */}
            <input
              className="form__input"
              placeholder={topic.value}
              name={i}
              id={topic.id}
              value={topic.value}
              onChange={this.handleTopicChange}
            />
            <IoIosTrash
              style={{ cursor: "pointer" }}
              onClick={this.deletTopic.bind(this, i, ind)}
            />
            {/* </div> */}
          </div>
        );
      });

      return (
        <div
          onSubmit={this.addTopic}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "16px",
            paddingBottom: "16px"
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
              marginTop: "8px",
              cursor: "pointer"
            }}
            id={i}
            name={i}
            onClick={this.addTopic}
          >
            Add Topic
          </span>
          {/* <span id={i} name={i} onClick={this.addChapter}>
                add a chapter
              </span> */}
        </div>
      );
    });

    // if (renderedChapters) return <div>{renderedChapters}</div>;
    return (
      <section className="form-section">
        <h2 className="form-section__heading">Create A Topic</h2>
        <div className="form-container">
          <form className="form">
            {/* <img
                  className="visitor-tutor__img"
                  src={this.state.imgPath}
                  alt="profile"
                /> */}
            <input
              type="file"
              // accept="image/*"
              name="photo"
              onChange={this.handleFileChange}
            />
            <label className="form__label" htmlFor="course-name">
              Course Name:
            </label>
            <input
              className="form__input"
              onChange={this.handleInputChange}
              type="text"
              id="course-name"
              name="name"
              required
            />

            <label className="form__label" htmlFor="description">
              Description:
            </label>
            <textarea
              className="form__message"
              name="description"
              onChange={this.handleInputChange}
              id="message"
              cols="30"
              rows="10"
            ></textarea>

            <label className="form__label" htmlFor="syllable">
              Syllable:
            </label>
            {renderedChapters}
            {/* <label htmlFor=""> Chpater Name:</label>
                <input className="form__input" type="text" id="text" required />
                <label htmlFor=""> Topics:</label>
                <input className="form__input" type="text" id="text" required />
                <input className="form__input" type="text" id="text" required />
                <ul className="create-course__syllable-options">
                  <li className="create-course__syllable-add-topic">Add A Topic</li>
                  <li className="create-course__syllable-add-chapter">
                    Add A Chapter
                  </li>
                </ul> */}
            <ul className="create-course__syllable-options">
              <li
                className="create-course__syllable-add-chapter"
                onClick={this.addChapter}
              >
                Add A Chapter
              </li>
            </ul>
            <label className="form__label" htmlFor="date">
              Start Date of The Course
            </label>
            <input
              className="form__input"
              onChange={this.handleInputChange}
              type="date"
              id="date"
              name="startDate"
              required
            />
            {/* <label className="form__label" htmlFor="phone">
                  Phone Number:
                </label>
                <input type="tel" className="form__input" /> */}
            {/* TODO: ADD CITY INPUT */}
            {/* <label className="form__label" htmlFor="schedule">
                  Default Schedule
                </label>
                <input type="text" id="schedule" className="form__input" />
                <input type="text" id="schedule" className="form__input" /> */}
            <label className="form__label" htmlFor="price">
              Price (in SR) :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={this.handleInputChange}
              className="form__input"
            />
            {/* <span> SR</span> */}

            <span>General Info</span>
            <label className="form__label" htmlFor="price">
              Catagory:
            </label>
            <input
              type="text"
              id="catagory"
              name="category"
              onChange={this.handleInputChange}
              className="form__input"
            />
            {/* <span> SR</span> */}

            <label className="form__label" htmlFor="institution">
              Institution Name:
            </label>
            <input
              type="text"
              name="institution"
              onChange={this.handleInputChange}
              id="institution"
              className="form__input"
            />

            <input
              className="form__submit"
              type="button"
              onClick={this.handleSubmit}
              value="Create"
            />
          </form>
        </div>
      </section>
    );
  }
}
