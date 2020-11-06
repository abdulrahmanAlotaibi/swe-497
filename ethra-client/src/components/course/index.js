import React from "react";
import { Link } from "react-router-dom";
import { getRatingJSX } from "shared/helpers";
import GridList from "components/grid-list";
import "./index.scss";

function Course({ course }) {
  const rendredStars = getRatingJSX(5);
  return (
    <GridList>
      <Link className="course">
        <img
          className="course__img"
          src="https://reactjs.org/logo-og.png"
          alt="s"
        />
        <div className="course__info">
        <span className="course__name">{"React Basics"}</span>
          <span className="course__author">{"Abdulrahman Alotaibi"}</span>
          <div className="course__rating">{rendredStars}</div>
          <div className="course__price">{"135.88SR"}</div>
        </div>
      </Link>
    </GridList>
  );
}

export default Course;
