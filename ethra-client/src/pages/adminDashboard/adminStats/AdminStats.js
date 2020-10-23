import React from "react";
import AdminStat from "./adminStat/AdminStat";
import "../../Admin.scss";

export default function AdminStats(props) {
  const { numberOfCourses, numberOfStudents, numberOfTutors } = props;
  // To be discussed: Seperate label file
  const stats = [
    {
      type: "students",
      number: numberOfStudents,
    },
    {
      type: "tutors",
      number: numberOfTutors,
    },
    {
      type: "courses",
      number: numberOfCourses,
    },
  ];
  const displayedStats = stats.map((stat) => {
    const { type, number } = stat;
    return <AdminStat type={type} number={number} />;
  });
  return <ul className="admin__stats">{displayedStats}</ul>;
}
