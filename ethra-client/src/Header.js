import React, { Component } from "react";
import "./styles/Header.scss";
import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <MobileNav context={this.props.context} />
        <Nav context={this.props.context} />
      </header>
    );
  }
}

export default Header;
