import React from "react";
import "./index.scss";
import CartItem from "./cartItem/CartItem";
import CartCheckout from "./CartCheckout";
import withFetch from "../../shared/hoc/withFetch";

// function Cart(props) {
//   const { handlers, data } = props;
//   const { items, totalPrice } = data;
//   const { handleRemoveItem } = handlers;
//   return (
//     <section className="cart-section">
//       <div className="cart">
//         <ul className="cart__list">
//           renderedItems(CartItem, items, {handleRemoveItem})
//           {/* {renderedItems(items, { handleRemoveItem })} */}
//         </ul>
//       </div>
//       <CartCheckout totalPrice={totalPrice} />
//     </section>
//   );
// }

// export default withFetch(Cart, "/courses/cart", headers);

export default function Cart(props) {
  const data = useFetch();
  const []
}
