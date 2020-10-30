import React, { useState, useReducer } from "react";
import "./index.scss";
import CartItem from "./cartItem/CartItem";
import CartCheckout from "./CartCheckout";
import getCart from "courseAPI";
import { renderedItems } from "../../shared/common";
import { cartReducer, cartState, REMOVE_ITEM } from "./util";

export default function Cart(props) {
  const [state, dispatch] = useReducer(cartReducer, cartState);
  function handleRemoveItem() {
    dispatch({
      type: REMOVE_ITEM,
      payload: {},
    });
  }
  return (
    <section className="cart-section">
      <div className="cart">
        <ul className="cart__list">
          renderedItems(CartItem, items, {handleRemoveItem})
        </ul>
      </div>
      <CartCheckout totalPrice={totalPrice} />
    </section>
  );
}
