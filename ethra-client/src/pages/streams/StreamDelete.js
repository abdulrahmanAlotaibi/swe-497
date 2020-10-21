import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class StreamDelete extends React.Component {
  state = {
    stream: {}
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `http://localhost:3001/streams/${this.props.match.params.id}`
      );
      this.setState(() => ({ stream: response.data.data }));
      // this.props.fetchStream(this.props.match.params.id);
    } catch (err) {
      console.log(err);
    }
  }

  deleteStream = async id => {
    try {
      await axios.delete(`http://localhost:8000/stream/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (Object.keys(this.state.stream).length === 0) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${this.state.stream.title}`;
  }

  render() {
    return (
      <div>
        <h1>Delete Stream</h1>
        <h2>{this.renderContent()}</h2>
        <div>{this.renderActions()}</div>
      </div>
    );
  }
}
