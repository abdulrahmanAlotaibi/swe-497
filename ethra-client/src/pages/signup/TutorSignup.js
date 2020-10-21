import React, { useReducer } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  UPDATE_INPUT,
  tutorSignupState,
  signupReducer,
} from "pages/signup/util";

function TutorSignup({ createAccount }) {
  const [state, dispatch] = useReducer(signupReducer, tutorSignupState);

  const handleFormChange = (evt) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key: evt.target.name,
        value: evt.target.value,
      },
    });
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key: "phoneNumber",
        value: phoneNumber,
      },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const role = "tutor";

    try {
      createAccount({ role, state });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        type="email"
        className="form__input"
        id="name"
        name="name"
        autoFocus={true}
        fullWidth={true}
        autoFocus={true}
        required={true}
        label="Full Name"
        onChange={handleFormChange}
      />

      <TextField
        className="form__input"
        id="email"
        name="email"
        fullWidth={true}
        required={true}
        label="Email address"
        type="email"
        helperText="We'll never share your email."
        onChange={handleFormChange}
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
        onChange={handleFormChange}
      />

      <TextField
        className="form__input"
        id="password-confirm"
        name="confirmPassword"
        aria-describedby="password"
        fullWidth={true}
        required={true}
        type="password"
        label="Confirm Password"
        onChange={handleFormChange}
      />

      <MuiPhoneNumber
        className="form__input"
        defaultCountry={"sa"}
        fullWidth={true}
        label="Phone Number"
        onChange={handlePhoneNumberChange}
      />

      <TextField
        type="text"
        label="Qualifications"
        className="form__input"
        name="qualifications"
        id="qualifications"
        fullWidth={true}
        required={true}
        onChange={handleFormChange}
      />

      <Button
        variant="contained"
        className="form__submit"
        type="submit"
        color="secondary"
        disableElevation
      >
        Sign Up
      </Button>
    </form>
  );
}

export default TutorSignup;
