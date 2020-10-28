import React from "react";
import "./index.scss";
import { IoIosTrash } from "react-icons/io";

export default function CartItem(props) {
  const { _id, name, price, removeCourse } = props;
  return (
    <li className="cart__item">
      <div className="cart__info">
        <span className="cart__name"> {name} </span>
      </div>
      <div className="cart__price-container">
        <span className="cart__price"> {`${price} SR`} </span>
        <span className="cart__remove">
          <IoIosTrash onClick={this.removeCourse.bind(this, _id)} />
        </span>
      </div>
    </li>
  );
}
