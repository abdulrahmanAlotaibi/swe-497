import React, { Component, useReducer } from "react";
import "components/form/Form.scss";
import "./ContactUs.scss";
import MessageSuccess from "./MessageSuccess";
import { handleFormChange, UPDATE_INPUT } from "../../shared/common";
import { EMAIL_IN_PROGRESS } from "./util";

export default function ContactUs(props) {
  const [state, dispatch] = useReducer(contactUsState, contactUsReducer);
  const { isSubmitted } = state;

  function handleSubmit() {
    dispatch({
      type: EMAIL_IN_PROGRESS,
    });
    // TODO: send the request
  }
  if (isSubmitted) {
    return <MessageSuccess />;
  }

  return (
    <section className="form-section">
      <h1 className="form-section__heading">Contact Us</h1>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="form__input"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleFormChange}
          />
          <label className="form__label" htmlFor="subject">
            Subject:
          </label>
          <input
            className="form__input"
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={handleFormChange}
          />

          <label className="form__label" htmlFor="message">
            Message:
          </label>
          <textarea
            className="form__message"
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={message}
            onChange={handleFormChange}
          ></textarea>
          <button className="form__submit">Send</button>
        </form>
      </div>
    </section>
  );
}
