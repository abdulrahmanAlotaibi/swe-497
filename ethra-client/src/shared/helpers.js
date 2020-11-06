import React, { Component } from "react";
import { IoIosStar } from "react-icons/io";

/**
 * @param {string} rating
 * @desc returns the markup of course stars
 */
export function getRatingJSX(rating) {
  const countStars = Array.apply(null, Array(parseInt(rating)));

  if (countStars.length === 0) {
    return (
      <>
        <IoIosStar className="stars-grey" />
        <IoIosStar className="stars-grey" />
        <IoIosStar className="stars-grey" />
        <IoIosStar className="stars-grey" />
        <IoIosStar className="stars-grey" />
      </>
    );
  }

  const rendredStars = countStars.map((i) => {
    return <IoIosStar />;
  });
  return rendredStars;
}

/**
 * @desc returns the :id paramter from the URL
 */
export function getUrlId() {
  const url = window.location.href.split("/");
  const id = url[4];
  return id;
}
