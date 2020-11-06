import React, { Component } from "react";
import Search from "components/search";
import { Link } from "react-router-dom";
// import axios from "axios";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';import "./Nav.scss";
function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__start">
        <Link to="/" className="logo logo--nav">
          SWE497
        </Link>
        <ul className="explore-list"><span>Explore</span>
        <div><KeyboardArrowDownIcon className="explore-list__icon"/></div>
        </ul>
      </ul>

      <ul className="nav__middle">
        <Search />
      </ul>

      <ul className="nav__end">
        <li className="nav__item">
          <Link to="/search">My Courses</Link>
        </li>

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
      </ul>
    </nav>
  );
}

export default Nav;
