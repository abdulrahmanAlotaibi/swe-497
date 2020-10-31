import React, { useReducer } from "react";
import StudentSignup from "./StudentSignUp";
import "./Signup.scss";
import TutorSignup from "./TutorSignup";
import SignupType from "./SignupType";
import {
  UPDATE_INPUT,
  UPDATE_IS_LOADING,
  signupState,
  signupReducer,
  SIGNUP_SUCCESS,
} from "pages/signup/util";
import { signup } from "util/api/UserAPI";

function Signup() {
  const [state, dispatch] = useReducer(signupReducer, signupState);

  const handleTypeChange = (type) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key: "type",
        value: type,
      },
    });
  };

  const createAccount = async (account) => {
    dispatch({
      type: UPDATE_IS_LOADING,
    });

    try {
      const res = await signup(state.type, account);
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    } catch (e) {
      let message = e.response.data.message;
    }
  };

  return (
    <section className="form-section">
      <h1 className="form-section__heading">Sign Up</h1>
      <SignupType handleTypeChange={handleTypeChange} type={state.type} />
      <div className="form-container">
        {state.type === "student" ? (
          <StudentSignup createAccount={createAccount} errors={state.errors} />
        ) : (
          <TutorSignup createAccount={createAccount} errors={state.errors} />
        )}
      </div>
      ;
    </section>
  );
}

export default Signup;
