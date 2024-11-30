import React from "react";
import { useParams } from "react-router-dom";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();

  // Your logic to fetch employee data goes here. Example:
  const employee = {
    department: "Engineering",
    office: "New York",
    category: "Full-Time",
    manager: "Manager Name",
    startDate: "2020-01-01",
    termDate: null,
    tenure: "3 years",
    role: "AI Engineer"
  };

  return (
    <ToggledSkillsProvider>
      <TrackProvider>
        <EmployeeDetails employee={employee} id={id || ""} />
      </TrackProvider>
    </ToggledSkillsProvider>
  );
};

export default EmployeeProfile;
