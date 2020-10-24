import React, { useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  UPDATE_INPUT,
  studentSignupState,
  signupReducer,
  handleFormChange,
} from "pages/signup/util";

function StudentSignup({ createAccount }) {
  const [state, dispatch] = useReducer(signupReducer, studentSignupState);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const role = "student";
    const { name, email, password, confirmPassword } = state;

    try {
      createAccount({
        role,
        name: name,
        email,
        password,
        confirmPassword,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        type="email"
        label="Full Name"
        className="form__input"
        id="name"
        name="name"
        autoFocus={true}
        fullWidth={true}
        autoFocus={true}
        required={true}
        defaultValue={state.name}
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
      />

      <TextField
        type="email"
        label="Email address"
        className="form__input"
        id="email"
        name="email"
        fullWidth={true}
        required={true}
        helperText="We'll never share your email."
        defaultValue={state.email}
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
      />

      <TextField
        type="password"
        label="Password"
        className="form__input"
        id="password"
        name="password"
        aria-describedby="password"
        fullWidth={true}
        required={true}
        defaultValue={state.password}
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
      />

      <TextField
        type="password"
        label="Confirm Password"
        id="password-confirm"
        className="form__input"
        name="confirmPassword"
        aria-describedby="password"
        fullWidth={true}
        required={true}
        defaultValue={state.confirmPassword}
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
      />

      <Button
        type="submit"
        className="form__submit"
        variant="contained"
        color="secondary"
        disableElevation
      >
        Sign Up
      </Button>
    </form>
  );
}

export default StudentSignup;
