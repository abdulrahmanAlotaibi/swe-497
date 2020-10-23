import { UPDATE_INPUT } from "pages/signup/util";

export const UPDATE_CONTROLLER = "UPDATE_CONTROLLER";

export const adminState = {
  controller: "courses",
};

export function adminReducer(state, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return { ...state, controller: action.payload.value };
  }
}
