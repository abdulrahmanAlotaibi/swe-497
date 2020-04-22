import React from "react";
export default class StreamForm extends React.Component {
  state = {
    title: "",
    description: ""
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  };

  inputChangeHandler = event => {
    const { value, name } = event.target;
    console.log(name, value);

    this.setState(() => ({ [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="ui form error">
        <label>Title</label>
        <input
          name="title"
          value={this.state.title}
          type="text"
          onChange={this.inputChangeHandler}
        />
        <label>Description</label>
        <input
          name="description"
          value={this.state.description}
          type="text"
          onChange={this.inputChangeHandler}
        />

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
