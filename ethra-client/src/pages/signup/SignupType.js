import React, { useState } from "react";

export default function SignupType({ handleTypeChange, type }) {
  return (
    <ul className="signup-page__type-list">
      <li className="signup-page__type-item">
        <label>
          <input
            type="radio"
            value="student"
            className="signup-page__radio"
            onChange={(evt) => handleTypeChange(evt.target.value)}
            checked={type === "student"}
          />
          <span>Student</span>
        </label>
      </li>

      <li className="signup-page__type-item">
        <label>
          <input
            type="radio"
            value="tutor"
            className="signup-page__radio"
            onChange={(evt) => handleTypeChange(evt.target.value)}
            checked={type === "tutor"}
          />
          <span>Tutor</span>
        </label>
      </li>
    </ul>
  );
}
