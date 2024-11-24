export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  // Create dates in UTC to avoid timezone issues
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  // Normalize dates to start of day for accurate comparison
  today.setUTCHours(0, 0, 0, 0);
  oneYearAgo.setUTCHours(0, 0, 0, 0);
  
  console.log('Calculating employees added in the last year...');
  console.log('One year ago:', oneYearAgo.toISOString());
  console.log('Today:', today.toISOString());
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    
    // Create date in UTC
    const startDate = new Date(employee.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    
    console.log(`Employee ${employee.name} start date:`, startDate.toISOString());
    console.log(`One year ago date for comparison:`, oneYearAgo.toISOString());
    
    // Check if start date is after one year ago (exclusive)
    const isInLastYear = startDate > oneYearAgo;
    console.log(`${employee.name} start date > one year ago:`, isInLastYear);
    
    return isInLastYear;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};