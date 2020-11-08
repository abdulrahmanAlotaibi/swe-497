import React, { Component, useReducer } from "react";
import "components/form/Form.scss";
import "./index.scss";
import MessageSuccess from "./MessageSuccess";
import { handleFormChange, UPDATE_INPUT } from "../../shared/common";
import { EMAIL_IN_PROGRESS, contactUsReducer, contactUsState } from "./state";
import Input from "../../components/input/Input";
import uuid from "uuid";
import { inputs } from "./pageLabels";
import {renderItems} from '../../shared/helpers'

export default function ContactUs(props) {
  const [state, dispatch] = useReducer(contactUsState, contactUsReducer);
  const { isSubmitted } = state;

  function handleSubmit() {
    dispatch({
      type: EMAIL_IN_PROGRESS,
    });
    // TODO: send the request
  }

  const handleFormChange = (key, value) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key,
        value,
      },
    });
  };
  if (isSubmitted) {
    return <MessageSuccess />;
  }

  return (
    <section className="form-section">
      <h1 className="form-section__heading">Contact Us</h1>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {renderItems(Input, inputs, { handleFormChange })}
          <button className="form__submit">Send</button>
        </form>
      </div>
    </section>
  );
}

/*
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

*/
