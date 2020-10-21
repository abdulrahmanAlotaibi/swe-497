import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class StreamList extends React.Component {
  state = {
    streams: []
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3001/streams");
      // const response = await axios.get("http://localhost:3000/streams");
      
      this.setState(() => ({streams: response.data}));
    } catch(err) {
      
    }
  }

  renderAdmin(stream) {
    return (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link
          to={`/streams/delete/${stream.id}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );
  }

  renderList() {
    return this.state.streams.map(stream => {
      console.log(stream)

      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    return (
      <div style={{ textAlign: "right" }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );
  }

  render() {
    if(!this.state.streams) {
      return <h1>Error!!!!!</h1>
    }
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}



