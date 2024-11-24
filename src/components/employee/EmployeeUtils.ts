export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  // Normalize dates to start of day
  today.setHours(0, 0, 0, 0);
  oneYearAgo.setHours(0, 0, 0, 0);
  
  console.log('Calculating employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  console.log('Today:', today.toISOString());
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    const startDate = new Date(employee.startDate);
    startDate.setHours(0, 0, 0, 0); // Normalize employee start date
    
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    const isInLastYear = startDate >= oneYearAgo && startDate <= today;
    console.log(`${employee.name} added in last year:`, isInLastYear);
    
    return isInLastYear;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};