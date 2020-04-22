import React, { Component } from "react";

class StudentSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(evt) {
    console.log(evt.target.name);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const role = "student";
    const { name, email, password, confirmPassword } = this.state;

    try {
      this.props.createAccount({
        role,
        name: name,
        email,
        password,
        confirmPassword
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form__label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="form__input"
          type="text"
          id="name"
          name="name"
          onChange={this.handleFormChange}
          required
        />

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className="form__input"
          type="email"
          id="email"
          name="email"
          onChange={this.handleFormChange}
          required
        />
        <label className="form__label" htmlFor="password">
          Password:
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          name="password"
          onChange={this.handleFormChange}
          required
        />
        <label className="form__label" htmlFor="password-confirm">
          Confirm password:
        </label>
        <input
          className="form__input"
          type="password"
          id="password-confirm"
          name="confirmPassword"
          onChange={this.handleFormChange}
          required
        />
        <input className="form__submit" type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default StudentSignup;
