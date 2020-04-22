import React, { Component } from "react";
import "./styles/Cart.scss";
import { IoIosTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import LoadingSpinner from "./components/LoadingSpinner";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      totalPrice: 0,
      cartEmpty: false
    };
    this.getCart = this.getCart.bind(this);
  }

  componentDidMount() {
    this.getCart();
  }

  handleToken = async (token, addresses) => {
    const cachedToken = JSON.parse(window.localStorage.getItem("token"));

    try {
      const response = await axios.post(
        "https://ethra.herokuapp.com/stripe/api/checkout-session",
        { token, price: this.state.totalPrice, courses: this.state.courses },
        {
          headers: { authorization: `Bearer ${cachedToken}` }
        }
      );
      this.props.history.push("/my-courses");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  async getCart() {
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      console.log("Cart.js token: ", token);
      const res = await axios.get("https://ethra.herokuapp.com/course/cart", {
        headers: { authorization: `Bearer ${token}` }
      });
      const { courses, totalPrice } = res.data.data;
      this.setState({ courses, totalPrice, cartEmpty: false });
    } catch (err) {
      if (err.response.data.message === "There are no courses in the cart") {
        this.setState(() => ({
          cartEmpty: true
        }));
      }
    }
  }

  removeCourse = async id => {
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      await axios.delete(`https://ethra.herokuapp.com/course/cart/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      this.getCart();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  checkout = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"));

    try {
      const res = await axios.get(
        `https://ethra.herokuapp.com/stripe/api/checkout-session`,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    if (this.state.cartEmpty) {
      return (
        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Empty Cart</h1>
      );
    }
    if (!this.state.courses || Object.keys(this.state.courses).length === 0) {
      return <LoadingSpinner />;
    }
    const renderedCourses = this.state.courses.map(course => {
      return (
        <li key={course._id} clssName="cart__item">
          <div className="cart__info">
            {/* <img className="cart__img" src="img/p1.jpg" /> */}
            <span className="cart__name">{course.name}</span>
          </div>
          <div className="cart__price-container">
            <span className="cart__price">{`${course.price} SR`}</span>
            <span className="cart__remove">
              <IoIosTrash onClick={this.removeCourse.bind(this, course._id)} />
            </span>
          </div>
        </li>
      );
    });
    return (
      <section className="cart-section">
        <div className="cart">
          <ul className="cart__list">{renderedCourses}</ul>
          <div className="cart__checkout">
            <span className="cart__total-text">Total:</span>
            <span className="cart__total-price">{this.state.totalPrice}</span>
            <StripeCheckout
              stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
              token={this.handleToken}
              amount={this.state.totalPrice * 100}
              name="Cart Checkout"
              currency="SAR"
              billingAddress
              shippingAddress
            />
            {/* <Link className="cart__checkout-btn" to="/stripe-cart">
              Checkout
            </Link> */}
            {/* <button onClick={this.checkout}>Checkout</button> */}
          </div>
        </div>
      </section>
    );
  }
}

export default Cart;
