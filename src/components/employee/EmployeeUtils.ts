export const getEmployeesAddedLastYear = (filteredEmployees: any[]) => {
  console.log('Calculating employees added in the last year...');
  
  const employeesAddedLastYear = filteredEmployees.filter(employee => {
    const wasAddedLastYear = employee.addedPastYear === 'YES';
    console.log(`Employee ${employee.name} added past year:`, wasAddedLastYear);
    return wasAddedLastYear;
  });

  console.log('Employees added in last year:', employeesAddedLastYear.map(e => e.name));
  return employeesAddedLastYear.length;
};