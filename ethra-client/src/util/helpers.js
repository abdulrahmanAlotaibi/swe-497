import React, { Component } from "react";
import { IoIosStar } from "react-icons/io";

export function getRatingJSX(rating) {
  const countStars = Array.apply(null, Array(parseInt(rating)));

  
  if (countStars.length === 0 ) {
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
    return <IoIosStar className="stars-yellow" />;
  });
  return rendredStars;
}

export function getUrlId() {
  // Get URL
  const url = window.location.href.split("/");
  const id = url[4];
  return id;
}
