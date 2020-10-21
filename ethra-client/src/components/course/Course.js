import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
import "./Course.scss";
import { getRatingJSX } from "util/helpers";
/**
 * Desc: this  is the course represenation card
 * Used in Search.js inside the rendered list of courses.
 */

class Course extends Component {
  render() {
    const {
      type,
      _id,
      name,
      category,
      institution,
      description,
      tutor,
      img,
      price,
      rating
    } = this.props.course;
    console.log(type);
    if (!this.props.course) {
      return <LoadingSpinner />;
    }
    const rendredStars = getRatingJSX(rating);
    console.log("HO", type)
    return (
      <Link to={`/${type}/${_id}`} className="course">
        <img className="course__img" src={img} alt="s" />
        <span className="course__name">{name}</span>
        <span className="course__author">{this.props.tutorName}</span>
        {!this.props.owned ? ( //here we check if the course is owned by student (if the course is owned we dont need to show the price)
          <span className="course__price">{`${price} SR`}</span>
        ) : null}
        <div className="course__rating">{rendredStars}</div>
      </Link>
    );
  }
}

export default Course;
