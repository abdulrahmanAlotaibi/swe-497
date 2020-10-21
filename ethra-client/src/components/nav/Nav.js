import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

import "./Nav.scss";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    // this.getInfo = this.getInfo.bind(this);
  }
  // componentDidUpdate() {
  //   this.getInfo();
  // }

  // async getInfo() {
  //   const token = this.props.context.state.token;

  //   const role = "student";
  //   try {
  //     const body = {
  //       role
  //     };
  //     const res = await axios.get("http://localhost:8000/course/cart", {
  //       headers: { authorization: `Bearer ${token}` }
  //     });
  //     console.log(">>>>", res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  render() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const role = JSON.parse(window.localStorage.getItem("role"));
    // const { token, role, name, isBanned, id } = JSON.parse(
    //   window.localStorage.getItem("account")
    // );
    console.log("⏳", token);

    return (
      <nav className="nav">
        <Link to="/" className="logo logo--nav">
          Ethra
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/search">Courses</Link>
          </li>
          <li className="nav__item">
            <Link to="/topics">Topics</Link>
          </li>
          <li className="nav__item">
            <Link to="/contact-us">Contact Us</Link>
          </li>
          {token ? (
            <>
              {role === "student" ? (
                <div>
                  <li className="nav__item" style={{ display: "inline-block" }}>
                    <Link to="/my-courses">My Courses</Link>
                  </li>
                  <li className="nav__item" style={{ display: "inline-block" }}>
                    <Link to="/my-topics">My Topics</Link>
                  </li>
                  <li className="nav__item" style={{ display: "inline-block" }}>
                    <Link to="/cart">Cart</Link>
                  </li>
                </div>
              ) : role === "admin" ? (
                <li className="nav__item">
                  <Link to="/admin">Dahsboard</Link>
                </li>
              ) : (
                <li className="nav__item">
                  <Link to="/dashboard-tutor">Dahsboard</Link>
                </li>
              )}
              <li className="nav__item">
                <Link to="/edit-profile">Profile</Link>
              </li>
              <li className="nav__item">
                <Link
                  className="signup-link"
                  to="/signin"
                  onClick={() => this.props.context.resetAccount()}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav__item">
                <Link className="signin-link" to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav__item">
                <Link className="signup-link" to="/signup">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

export default Nav;
