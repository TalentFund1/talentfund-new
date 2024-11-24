export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  console.log('Calculating employees added in the last year...');
  console.log('All filtered employees:', filteredEmployees.map(e => ({
    name: e.name,
    startDate: e.startDate,
    addedPastYear: e.addedPastYear
  })));
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => employee.addedPastYear === "YES");

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};