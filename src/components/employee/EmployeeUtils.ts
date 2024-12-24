import { employees } from "./EmployeeData";
import { filterEmployees } from "./EmployeeFilters";
import { getBaseRole } from "../EmployeeTable";

export const getEmployeesAddedLastYear = (
  selectedEmployees: ReadonlyArray<string> = [],
  selectedDepartment: ReadonlyArray<string> = [],
  selectedLevel: ReadonlyArray<string> = [],
  selectedOffice: ReadonlyArray<string> = [],
  selectedEmploymentType: ReadonlyArray<string> = [],
  selectedSkills: ReadonlyArray<string> = [],
  selectedManager: ReadonlyArray<string> = []
) => {
  // First apply all filters
  const filteredEmployees = filterEmployees(
    employees,
    selectedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );
  
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  console.log('Calculating filtered employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  
  return filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    return startDate >= oneYearAgo;
  }).length;
};