import React from "react";
// import flv from "flv.js";
import axios from "axios";
import "/StreamDashboard.scss";
import LoadingSpinner from ".components/loadingIcon/LoadingSpinner";
import "/Admin.scss";
import { v4 as uuidv4 } from "uuid";

export default class StreamDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      videos: [],
      video: "",
      loading: true,
      error: "",
      isDisabled: true,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.getVideoTitle = this.getVideoTitle.bind(this);
  }

  componentDidMount() {
    this.getVideos();
  }

  handleTextChange = (evt) => {
    const { value } = evt.target;
    this.setState({ title: value });
  };
  getVideos = async () => {
    try {
      const { id } = this.props.match.params;
      const res = await axios.get(`http://localhost:8000/course/${id}/videos`);
      const videos = res.data.data;
      // for (let i = 0; i < videos.length; i++) {
      //   videos[i] = `http://localhost:8000/${videos[i]}`;
      // }
      this.setState({ videos, loading: false });
    } catch (err) {
      console.log(err);
    }
  };
  handleFileChange = (evt) => {
    const { files } = evt.target;
    this.setState({ video: files[0] });
  };

  deleteVideo = async (id, index) => {
    try {
      await axios.delete(`http://localhost:8000/course/videos/${id}`);
      const newVideos = [...this.state.videos];
      newVideos.splice(index, 1);
      this.setState({ videos: newVideos });
    } catch (err) {
      console.log(err.message);
    }
  };

  uploadVideo = async () => {
    try {
      const { id } = this.props.match.params;
      const { video, title } = this.state;
      if (!video) {
        return this.setState({ error: "Please choose video to upload" });
      }
      const fd = new FormData();
      fd.append("video", video);
      fd.append("title", title);
      const res = await axios.post(
        `http://localhost:8000/course/${id}/upload-video`,
        fd
      );
      const newVideos = [...this.state.videos];
      newVideos.push(res.data.data);
      this.setState({ videos: newVideos });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  handleTitleChange(evt, i) {
    const { value } = evt.target;
    const { videos } = this.state;
    const newVideoId = videos[i]._id;
    console.log(newVideoId);
    const newVideos = videos.map((v) => {
      if (v._id === newVideoId) {
        console.log(v.title);
        const newVideo = {
          ...v,
          title: value,
        };
        return newVideo;
      }
      return v;
    });
    this.setState({ videos: [...newVideos] });
  }

  handleChangeSubmission = async () => {
    try {
      const { videos } = this.state;
      const res = await axios.patch(
        "http://localhost:8000/course/videos/update",
        { videos }
      );
      const newVideos = res.data.data;
      this.setState({ videos: newVideos });
    } catch (err) {
      console.log(err.message);
    }
  };

  getVideoTitle(i) {
    console.log(">>>>>>>>", this.state.vidoes[i].title);
    return this.state.vidoes[i].title;
  }

  render() {
    const { loading, videos, title, error } = this.state;
    if (loading) {
      return <LoadingSpinner />;
    }
    const renderedVideosLinks = videos.map((video, i) => (
      <li className="admin__courses-item">
        <input
          className="manager__input"
          type="text"
          value={this.state.videos[i].title}
          onChange={(evt) => this.handleTitleChange(evt, i)}
          disabled={this.state.isDisabled}
        />

        <span className="admin__courses-control-btn admin__courses-control-btn-edit">
          <button
            className="delete"
            onClick={this.deleteVideo.bind(this, video._id, i)}
          >
            Delete
          </button>
          {/* {!this.state.isDisabled && (
            <button
              className="edit"
              onClick={(evt) => this.handleTitleChange(evt, i)}
            >
              Save
            </button>
          )} */}
        </span>
      </li>
    ));
    return (
      <main className="stream-dashboard">
        <div className="stream__form">
          {error && <div className="stream__form-alert">{error}</div>}
          <div>
            <label className="stream__form-label" htmlFor="file">
              Upload New Video
            </label>
            <input
              className="stream__form-input"
              type="text"
              value={title}
              onChange={this.handleTextChange}
            />
            <input
              className="stream__form-input"
              type="file"
              onChange={this.handleFileChange}
              id="file"
            />
            <button className="stream__form-upload" onClick={this.uploadVideo}>
              Upload
            </button>
          </div>
          <ul className="admin__courses">{renderedVideosLinks}</ul>
          <button
            className="manager__edit"
            onClick={() => this.setState({ isDisabled: false })}
          >
            Edit
          </button>
          <button
            className="manager__cancel"
            onClick={() => this.setState({ isDisabled: true })}
          >
            Cancel
          </button>
          <button
            className="manager__submit"
            onClick={() => this.handleChangeSubmission()}
          >
            submit
          </button>
          {/* <ol>
          <h1>
            In order to open the stream in OBS, please follow the instructions
          </h1>
          <li>Open up OBS</li>
          <li>Open up Settings</li>
          <li>Go to Stream section</li>
          <li>Go to Stream section</li>
          <li>Choose service as Custome</li>
          <li>Copy this Link in the server field: rtmp://localhost/live/</li>
          {/* <li>Enter this key in the Stream Key field: {stream.id}</li> */}
          {/* <li>Press OK then press Strat Streaming</li> */}
          {/* </ol> */}
          {/* <video ref={this.videoRef} controls /> */}
          {/* <ReactHLS url={"https://caf900c010ea8046.mediapackage.eu-west-3.amazonaws.com/out/v1/5b6777c7dd83444093ac8bcc19d26d25/index.m3u8"} /> */}
          {/* <CommentsList author={this.props.context.state.name} /> */}
        </div>
      </main>
    );
  }
}
