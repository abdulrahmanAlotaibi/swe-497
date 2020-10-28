import React from 'react';
import StripeCheckout from "react-stripe-checkout";

export default function CartCheckout(props) {
  const { totalPrice } = props;
  return (
    <div className="cart__checkout">
      <span className="cart__total-text"> Total: </span>
      <span className="cart__total-price"> {totalPrice} </span>
      <StripeCheckout
        stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
        // token={this.handleToken}
        amount={totalPrice * 100}
        name="Cart Checkout"
        currency="SAR"
        billingAddress
        shippingAddress
      />
    </div>
  );
}
