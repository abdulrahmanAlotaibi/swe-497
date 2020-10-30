export const EMAIL_IN_PROGRESS = "EMAIL_IN_PROGRESS";
export const EMAIL_SUCCESS = "EMAIL_SUCCESS";
export const EMAIL_FAIL = "EMAIL_FAIL";

export const contactUsState = {
  email: "",
  subject: "",
  message: "",
  isSubmitted: false,
  isLoading: false,
};

export function contactUsReducer(state, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return { ...state, [action.payload.key]: action.payload.value };
    case EMAIL_IN_PROGRESS:
      return { ...state, isLoading: true };
    case EMAIL_SUCCESS:
      return { ...state, isSubmitted: true, isLoading: false };
    case EMAIL_FAIL:
      return { ...state, isLoading: false };
  }
}
