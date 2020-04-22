import React from "react";
import StreamForm from "./StreamForm";
import axios from "axios";

export default class StreamCreate extends React.Component {
  onSubmit = async formValues => {
    try {
      const { id } = this.props.match.params;
      const res = await axios.post("http://localhost:3001/streams", {
        ...formValues
      });
      await axios.post(`https://ethra.herokuapp.com/stream/${id}`, {
        id: res.data.id
      });
      this.props.history.push(`/streams/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
