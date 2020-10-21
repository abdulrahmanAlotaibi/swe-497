import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { Redirect } from "react-router-dom";
import "./Subscription.scss";

export default class extends Component {
  handleToken = async (price, token, addresses) => {
    const cachedToken = JSON.parse(window.localStorage.getItem("token"));
    if (this.props.match.params.id !== "new") {
      try {
        const res = await axios.post(
          `http://localhost:8000/stripe/api/customer/renew-subscribe/${this.props.match.params.id}`,
          { token, price }
        );
        const { role, name, isBaned, _id } = res.data.data.tutor;
        this.props.context.updateAccount(
          res.data.data.token,
          role,
          name,
          isBaned,
          _id
        );
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        localStorage.setItem("role", JSON.stringify(role));
        return this.props.history.push("/dashboard-tutor");
      } catch (err) {
        console.log(err.message);
        // console.log(err.response.data.message);
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/stripe/api/customer/subscribe",
        { token, price },
        {
          headers: {
            authorization: `Bearer ${cachedToken}`
          }
        }
      );

      this.props.history.push("/dashboard-tutor");
      // const { status } = response.data;
      console.log("Response:", response.data);
      // if (status === "success") {
      //   toast("Success! Check email for details", { type: "success" });
      // } else {
      //   toast("Something went wrong", { type: "error" });
      // }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  render() {
    return (
      <main className="subscription-page">
        <div className="subscription">
          <h1 className="subscription__primary-heading">Subscription Plans</h1>

          <ul className="subscription__list-cards">
            <li className="subscription__card">
              <h1 className="subscription__card-heading">Monthly</h1>
              <p className="subscription__card-price">20 SAR</p>
              <ul className="subscription__card-features">
                <li> Upload unlimitied videos</li>
                <li> Publish unlimitied courses</li>
                <li>All courses fees goes directly to you</li>
              </ul>
              <StripeCheckout
                stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
                token={this.handleToken.bind(this, 20)}
                amount={20 * 100}
                name="Monthly Subscription"
                currency="SAR"
                billingAddress
                shippingAddress
              />
            </li>
            <li className="subscription__card">
              <h1 className="subscription__card-heading">Yearly</h1>
              <p className="subscription__card-price"> 200 SAR</p>
              <ul className="subscription__card-features">
                <li> Upload unlimitied videos</li>
                <li> Publish unlimitied courses</li>
                <li> All courses fees goes directly to you</li>
              </ul>
              <StripeCheckout
                stripeKey="pk_test_U8jQFnCO1xQIuYClxSYZg3cy00aH73XkQu"
                token={this.handleToken.bind(this, 200)}
                amount={200 * 100}
                name="Yearly Subscription"
                currency="SAR"
                billingAddress
                shippingAddress
                style={{ color: "red" }}
              />
            </li>
          </ul>
        </div>
      </main>
    );
  }
}
