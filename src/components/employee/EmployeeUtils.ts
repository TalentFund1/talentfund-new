import { employees } from "./EmployeeData";

export const getEmployeesAddedLastYear = () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  console.log('Calculating employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  
  return employees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    return startDate >= oneYearAgo;
  }).length;
};