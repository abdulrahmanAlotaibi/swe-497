import React, { Component } from "react";
import "../styles/Hero.scss";
export default class Hero extends Component {
  render() {
    return (
      <section class="hero-section">
        <div className="hero-background"></div>
        <div className="heading-container">
          <h1 class="heading-primary">
            <span class="heading-primary--main">
              Get Better Grades with us.
            </span>
            <span class="heading-primary--sub">
              Your best resources to find the best tutors
            </span>
          </h1>
          <hr className="heading-primary__line" />
        </div>
      </section>
    );
  }
}
