export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  console.log('Calculating employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  console.log('Today:', today.toISOString());
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    return startDate > oneYearAgo && startDate <= today;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};