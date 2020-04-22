import React, { Component } from "react";
import { MdReplay } from "react-icons/md";
import "../styles/LoadingSpinner.scss";
export default class LoadingSpinner extends Component {
  render() {
    return (
      <div class="loading-spinner">
        {/* <MdReplay className="loader"/> */}
        <span    class="loading-spinner__icon"></span>
      </div>
    );
  }
}
