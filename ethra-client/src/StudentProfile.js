import React, { Component } from "react";
import "./styles/Profile.scss";
import Profile from "./Profile";

export default class StudentProfile extends Component {
  render() {
    return (
      <sectin className="profile-section">
        <Profile/>
      </sectin>
    );
  }
}
