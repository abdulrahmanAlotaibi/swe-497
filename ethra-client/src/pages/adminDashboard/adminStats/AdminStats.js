import React from "react";
import AdminStat from "./adminStat/AdminStat";
import "../../Admin.scss";

export default function AdminStats(props) {
  const { noCourses, noStudents, noTutors } = props;
  // To be discussed: Seperate label file
  const stats = [
    {
      type: "students",
      number: noStudents,
    },
    {
      type: "tutors",
      number: noTutors,
    },
    {
      type: "courses",
      number: noCourses,
    },
  ];
  const displayedStats = stats.map((stat) => {
    const { type, number } = stat;
    return <AdminStat type={type} number={number} />;
  });
  return <ul className="admin__stats">{displayedStats}</ul>;
}
