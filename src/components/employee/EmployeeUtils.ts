export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  console.log('Calculating employees added in the last year...');
  console.log('All filtered employees:', filteredEmployees.map(e => ({
    name: e.name,
    startDate: e.startDate,
    addedPastYear: e.addedPastYear
  })));
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    const startDate = new Date(employee.startDate);
    const wasAddedLastYear = startDate > oneYearAgo;
    console.log(`Employee ${employee.name} start date: ${employee.startDate}, was added last year: ${wasAddedLastYear}`);
    return wasAddedLastYear;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};