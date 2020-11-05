import React, { useReducer } from "react";
import StudentSignup from "./StudentSignUp";
import "./index.scss";
import TutorSignup from "./TutorSignup";
import SignupType from "./SignupType";
import {
  UPDATE_IS_LOADING,
  signupState,
  signupReducer,
  SIGNUP_IN_PROGRESS,
  SIGNUP_SUCCESS,
  UPDATE_INPUT,
} from "pages/signup/util";
// import { signup } from "util/api/UserAPI";

function Signup() {
  const [state, dispatch] = useReducer(signupReducer, signupState);

  const handleTypeChange = (type) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        key: "type",
        value: state.type,
      },
    });
  };

  const createAccount = async (account) => {
    dispatch({
      type: SIGNUP_IN_PROGRESS,
    });

    try {
      // const res = await signup(state.type, account);
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    } catch (e) {
      // let message = e.response.data.message;
    }
  };

  return (
    <section className="form-section">
      <h1 className="form-section__heading">Sign Up</h1>
      <SignupType handleTypeChange={handleTypeChange} type={state.type} />
      <div className="form-container">
        {state.type === "tutor" ? (
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
