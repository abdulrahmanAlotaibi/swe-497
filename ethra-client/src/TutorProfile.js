import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./styles/Profile.scss";
import Profile from "./Profile";
export default class TutorProfile extends Component {
  render() {
    const token = JSON.parse(window.localStorage.getItem("token"));

    if (!token) {
      return <Redirect to="/signin" />;
    } 
    return (
      <sectin className="profile-section">
        <Profile />
      </sectin>
    );
  }
}
