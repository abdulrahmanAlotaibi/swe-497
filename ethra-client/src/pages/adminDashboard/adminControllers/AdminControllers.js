import React, { useReducer } from "react";
import { UPDATE_CONTROLLER, adminState, adminReducer } from "../util";
import "../Admin.scss";

export default function AdminControllers(props) {
  const [state, dispatch] = useReducer(adminReducer, adminState);
  const handleTypeChange = (controller) => {
    dispatch({
        type: UPDATE_CONTROLLER,
        payload: {
            value: controller
        }
    })
  };
  const controllers = ["courses", "tutors", "students"];
  const displayedControllers = controllers.map((controller) => (
    <li>
      <button onClick={() => handleTypeChange(controller)}>{controller}</button>
    </li>
  ));
  return <ul className="admin__radio-list">{displayedControllers}</ul>;
}
