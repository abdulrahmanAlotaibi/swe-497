import React from "react";
import '../../../Admin.scss';

export default function AdminStat(props) {
  const { type, number } = props;
  return (
    <li>
      <div>
        <span className="admin__stats-name"> Number of {type}: </span>
        <span className="admin__stats-number"> {number} </span>
      </div>
    </li>
  );
}
