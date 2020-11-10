import React, { Component } from "react";
import Search from "components/search";
import { Link } from "react-router-dom";
// import axios from "axios";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';import "./Nav.scss";
import Logo from "components/logo"
import SearchIcon from '@material-ui/icons/Search';
function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__start">
        <Logo/>
        <div>Courses</div>
                <div>Books</div>
      </ul>

      {/* <ul className="nav__middle">
        <Search />
      </ul> */}

      <ul className="nav__end">
      <li>
        <SearchIcon className="nav__item nav__item--search"/>
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
