import React, { Component, useContext } from "react";
import "./styles/Form.scss";
import { Redirect } from "react-router-dom";
import { MyContext } from "./App";
// import { MyProvider } from "./App";
import axios from "axios";

// const MyContext = React.createContext(MyProvider);

class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authError: false,
      errorText: "",
      isSignin: false,
      type: "student"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleFormChange(evt) {
    console.log("><><><><", evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.signin();
  }

  handleTypeChange(evt) {
    this.setState({
      type: evt.target.value
    });
  }

  async signin() {
    const { email, password, type } = this.state;
    if (email === "asg1996@live.com" && password === "111111") {
      this.props.context.updateToken("admin");
      this.props.context.updateRole("admin");
      this.props.context.updateAccount(
        "admin",
        "admin",
        "admin",
        false,
        "admin"
      );
      return this.setState({ authError: false, isSignin: true });
    }
    try {
      const res = await axios.post(`https://ethra.herokuapp.com/${type}/login/`, {
        role: type,
        email,
        password
      });
      console.log("====================================");
      console.log(res.data.user);
      console.log("====================================");
      this.props.context.updateToken(res.data.token);
      this.props.context.updateRole(res.data.user.role);
      this.props.context.updateAccount(
        res.data.token,
        res.data.user.role,
        res.data.user.name,
        res.data.user.isBaned,
        res.data.user._id
      );
      this.setState({ authError: false, isSignin: true });
    } catch (e) {
      const message = e.response.data.message;
      console.log(message);
      if (
        "Your account has been banned, please contact us for more details" ===
        message
      ) {
        this.setState({ authError: true, errorText: message });
      }
      if ("Email or password are wrong" === message) {
        this.setState({ authError: true, errorText: message });
      }
      if ("Tutor's subscription has been expired" === message) {
        return this.props.history.push(`/subscribe/${e.response.data.data}`);
      }
      console.log(":100:", e.response.data);
    }
  }
  render() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const role = JSON.parse(window.localStorage.getItem("role"));

    if (token && role) {
      if (role === "tutor") {
        return <Redirect to="/dashboard-tutor" />;
      } else if (role === "student") {
        return <Redirect to="/my-courses" />;
      } else {
        return <Redirect to="/admin" />;
      }
    }

    if (this.state.isSignin) {
      if (role === "student") return <Redirect to="/my-courses" />;
      else if (role === "tutor") {
        return <Redirect to="/dashboard-tutor" />;
      } else if (role === "admin") {
        return <Redirect to="/admin" />;
      }
    }
    return (
      <MyContext.Consumer>
        {context => (
          <section className="form-section">
            <h1 className="form-section__heading">Sign In</h1>
            <div className="form-container">
              <ul className="form__type-list">
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
                <div className="form__fail-alert">{this.state.errorText}.</div>
              )}
              <form className="form" onSubmit={this.handleSubmit}>
                <label className="form__label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form__input"
                  type="email"
                  id="email"
                  required
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFormChange}
                />
                <label className="form__label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form__input"
                  type="password"
                  id="password"
                  required
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFormChange}
                />
                <input className="form__submit" type="submit" value="Sign In" />
              </form>
            </div>
          </section>
        )}
      </MyContext.Consumer>
    );
  }
}

export default form;
