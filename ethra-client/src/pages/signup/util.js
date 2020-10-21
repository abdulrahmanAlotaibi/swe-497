export const UPDATE_INPUT = "UPDATE_INPUT";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const UPDATE_ERRORS = "UPDATE_ERRORS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
// todo: handle validation error messages

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
    case UPDATE_IS_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case UPDATE_ERRORS:
      return { ...state, errors: action.payload.errors };
    case SIGNUP_SUCCESS: {
      // todo: update token
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


//  export const handleFormChange = (evt) => {
//     dispatch({
//       type: UPDATE_INPUT,
//       payload: {
//         key: evt.target.name,
//         value: evt.target.value,
//       },
//     });
//   };
