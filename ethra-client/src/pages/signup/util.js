export const UPDATE_INPUT = "UPDATE_INPUT";
export const SIGNUP_IN_PROGRESS = "SIGNUP_IN_PROGRESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

//  General State: Signup.js component
export const signupState = {
  type: "student",
  isLoading: false,
  errors: [],
};

export const studentSignupState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const tutorSignupState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  qualifications: "",
  country: "",
  city: "",
};

export const signupReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      return { ...state, [action.payload.key]: action.payload.value };
    case SIGNUP_IN_PROGRESS:
      return { ...state, isLoading: true };
    case SIGNUP_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case SIGNUP_FAIL: {
      const newState = {
        ...state,
        isLoading: false,
        password: "",
        confirmPassword: "",
        errors: action.payload.errors,
      };
      return newState;
    }
    default:
      return state;
  }
};
