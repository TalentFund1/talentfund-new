export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  console.log('Calculating employees added in the last year...');
  
  // Get current date and date 1 year ago
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  console.log('Reference dates:', {
    now: now.toISOString(),
    oneYearAgo: oneYearAgo.toISOString()
  });

  // Filter employees based on start date being within the last year
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    if (!employee.startDate) return false;
    
    const startDate = new Date(employee.startDate);
    const wasAddedLastYear = startDate > oneYearAgo;
    
    console.log('Employee start date check:', {
      name: employee.name,
      startDate: employee.startDate,
      wasAddedLastYear
    });
    
    return wasAddedLastYear;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => ({
    name: e.name,
    startDate: e.startDate
  })));
  
  return employeesAddedLastYear.length;
};