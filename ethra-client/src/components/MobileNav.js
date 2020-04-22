import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/MobileNav.scss";
export default class MobileNav extends Component {
  render() {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const role = JSON.parse(window.localStorage.getItem("role"));

    return (
      <article class="nav-mobile">
        <Link to="/" className="nav-mobile__logo">
          Ethra
        </Link>
        <input type="checkbox" class="nav-mobile__checkbox" id="nav-toggle" />
        <label for="nav-toggle" class="nav-mobile__btn">
          <span class="nav-mobile__icon">&nbsp;</span>
        </label>

        <nav class="nav-mobile__nav">
          <ul class="nav-mobile__list">
            <li className="nav-mobile__item">
              <Link class="nav-mobile__link" to="/search">
                Courses
              </Link>
            </li>
            <li className="nav-mobile__item">
              <Link class="nav-mobile__link" to="/topics">
                Topics
              </Link>
            </li>
            <li className="nav-mobile__item">
              <Link class="nav-mobile__link" to="/contact-us">
                Contact Us
              </Link>
            </li>
            {token ? (
              <>
                {role === "student" ? (
                  <div>
                    <li
                      className="nav-mobile__item"
                      style={{ display: "inline-block" }}
                    >
                      <Link class="nav-mobile__link" to="/my-courses">
                        My Courses
                      </Link>
                    </li>
                    <li className="nav-mobile__item">
                      <Link class="nav-mobile__link" to="/my-topics">
                        My Topics
                      </Link>
                    </li>
                    <li
                      className="nav-mobile__item"
                      style={{ display: "inline-block" }}
                    >
                      <Link class="nav-mobile__link" to="/cart">
                        Cart
                      </Link>
                    </li>
                  </div>
                ) : role === "admin" ? (
                  <li className="nav-mobile__item">
                    <Link class="nav-mobile__link" to="/admin">
                      Dahsboard
                    </Link>
                  </li>
                ) : (
                  <li className="nav-mobile__item">
                    <Link class="nav-mobile__link" to="/dashboard-tutor">
                      Dahsboard
                    </Link>
                  </li>
                )}
                <li className="nav-mobile__item">
                  <Link class="nav-mobile__link" to="/edit-profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-mobile__item">
                  <Link
                    class="nav-mobile__link"
                    to="/signin"
                    onClick={() => this.props.context.resetAccount()}
                  >
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-mobile__item">
                  <Link className="signin-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-mobile__item nav-mobile__item--signout">
                  <Link className="signup-link" to="/signup">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </article>
    );
  }
}
