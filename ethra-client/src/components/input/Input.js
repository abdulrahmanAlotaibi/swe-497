import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Input(props) {
  const { elementType, handleFormChange } = props;
  let element;
  switch (elementType) {
    case "input":
      element = (
        <TextField
          className="form__input"
          fullWidth={true}
          required={true}
          onChange={handleFormChange}
          {...props}
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          className="form__message"
          onChange={handleFormChange}
          {...props}
        />
      );
  }
  return <div>{element}</div>;
}
