import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/SectionSignup.scss";
class SectionSignup extends Component {
  render() {
    return (
      <section className="signup">
        <ul className="signup__list">
          <li className="signup__item signup__item--left">
            <div className="signup__text-box">
              <h2 className="signup__primary-heading">Student</h2>
              <p className="signup__description">
                Register for free and get a free houre with your tutor.
              </p>
              <Link className="signup__btn signup__btn--student" to="/signup">
                Register
              </Link>
            </div>
          </li>
          <li className="signup__item signup__item--right">
            <div className="signup__text-box">
              <h2 className="signup__primary-heading">Tutor</h2>
              <p className="signup__description">
                with affordable memberships, you can start today your teaching
                success.
              </p>
              <Link className="signup__btn signup__btn--tutor" to="/signup">
                Register
              </Link>
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

export default SectionSignup;
