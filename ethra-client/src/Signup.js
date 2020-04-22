import React, { Component } from "react";
import StudentSignup from "./StudentSignUp";
import "./styles/Signup.scss";
import "./styles/Form.scss";
import axios from "axios";
import TutorSignup from "./TutorSignup";
import { Redirect } from "react-router-dom";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "student",
      isSignup: false,
      authError: false,
      errorText: ""
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleTypeChange(evt) {
    this.setState({
      type: evt.target.value
    });
  }

  async createAccount(account) {
    try {
      const res = await axios.post(
        `https://ethra.herokuapp.com/${this.state.type}/signup/`,
        account
      );
      this.setState(() => {
        this.props.context.updateToken(res.data.token);
        this.props.context.updateRole(res.data.data.role);
        this.props.context.updateId(res.data.data._id);
        this.props.context.updateAccount(
          res.data.token,
          res.data.data.role,
          res.data.data.name,
          res.data.data.isBaned,
          res.data.data._id
        );
        return { isSignup: true };
      });

      console.log(res);
    } catch (e) {
      let message = e.response.data.message;
      if (message.toLowerCase().includes("duplicate")) {
        message = "This email is already exist";
      } else if (message.toLowerCase().includes("matched")) {
        message = "The passwords are not matched";
      } else {
        message = message.split(":")[2];
      }
      const status = e.response.data.status;
      if (status === "fail") {
        this.setState({ authError: true, errorText: message });
      }
    }
  }

  render() {
    const { type, isSignup } = this.state;

    // Redirect based on the type
    if (isSignup) {
      if (type === "student") return <Redirect to="/my-courses" />;
      else {
        return <Redirect to="/subscribe/new" />;
        // return <Redirect to="/dashboard-tutor" />;
      }
    }

    return (
      <section className="form-section">
        <h1 className="form-section__heading">Sign Up</h1>
        <ul className="signup-page__type-list">
          <li className="signup-page__type-item">
            <label>
              <input
                type="radio"
                value="student"
                className="signup-page__radio"
                onChange={this.handleTypeChange}
                checked={this.state.type === "student"}
              />
              <span>Student</span>
            </label>
          </li>

          <li className="signup-page__type-item">
            <label>
              <input
                type="radio"
                value="tutor"
                className="signup-page__radio"
                onChange={this.handleTypeChange}
                checked={this.state.type === "tutor"}
              />
              <span>Tutor</span>
            </label>
          </li>
        </ul>
        {this.state.authError && (
          <div className="form__fail-alert">
            {this.state.errorText}. Try Again
          </div>
        )}
        <div className="form-container">
          {/* /*Send the postRequestHandler method to the children component(You
          have to define this method in this component)*/}
          {this.state.type === "student" ? (
            <StudentSignup createAccount={this.createAccount} />
          ) : (
            <TutorSignup createAccount={this.createAccount} />
          )}
        </div>
        ;
      </section>
    );
  }
}

export default Signup;
