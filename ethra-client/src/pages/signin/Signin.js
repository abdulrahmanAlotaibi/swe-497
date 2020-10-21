import React, { Component, useContext, useeffect, useReducer } from "react";
import "components/form/Form.scss";
import { Redirect } from "react-router-dom";
import { MyContext } from "App";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function form() {
  const handleFormChange = (evt) => {};

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <MyContext.Consumer>
      {(context) => (
        <section className="form-section">
          <h1 className="form-section__heading">Sign In</h1>
          <div className="form-container">
            <form className="form">
              <TextField
                className="form__input"
                id="email"
                placeholder="example@gmail.com"
                name="email"
                aria-describedby="my-helper-text"
                fullWidth={true}
                autoFocus={true}
                required={true}
                label="Email address"
                type="email"
                helperText="We'll never share your email."
              />

              <TextField
                className="form__input"
                id="password"
                aria-describedby="password"
                fullWidth={true}
                required={true}
                type="password"
                label="Password"
              />

              <Button
                variant="contained"
                className="form__submit"
                type="submit"
                color="secondary"
                disableElevation
              >
                Sign in
              </Button>
            </form>
          </div>
        </section>
      )}
    </MyContext.Consumer>
  );
}
