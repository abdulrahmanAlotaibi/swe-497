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

  const handleFormChange = (key, value) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key,
        value,
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
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
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
        onChange={(evt) =>
          handleFormChange(evt.target.name, evt.target.value.value)
        }
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
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
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
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
      />

      <MuiPhoneNumber
        className="form__input"
        defaultCountry={"sa"}
        fullWidth={true}
        label="Phone Number"
        onChange={(phoneNumber) => handleFormChange("phoneNumber", phoneNumber)}
      />

      <TextField
        type="text"
        label="Qualifications"
        className="form__input"
        name="qualifications"
        id="qualifications"
        fullWidth={true}
        required={true}
        onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
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
