import { employees } from "./EmployeeData";
import { filterEmployees } from "./EmployeeFilters";
import { getBaseRole } from "../utils/roleUtils";

export const getEmployeesAddedLastYear = (
  selectedEmployees: string[] = [],
  selectedDepartment: string[] = [],
  selectedJobTitle: string[] = [],
  selectedLevel: string[] = [],
  selectedOffice: string[] = [],
  selectedEmploymentType: string[] = [],
  selectedSkills: string[] = [],
  selectedManager: string[] = []
) => {
  // First apply all filters
  const filteredEmployees = filterEmployees(
    employees,
    selectedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  // If job title is selected, only count exact role matches
  const relevantEmployees = selectedJobTitle.length > 0
    ? filteredEmployees.filter(emp => getBaseRole(emp.role) === selectedJobTitle[0])
    : filteredEmployees;
  
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  console.log('Calculating filtered employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  console.log('Selected job title:', selectedJobTitle);
  console.log('Relevant employees:', relevantEmployees);
  
  return relevantEmployees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    return startDate >= oneYearAgo;
  }).length;
};
