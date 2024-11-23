export const getEmployeesAddedLastYear = (employees: any[]) => {
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

export const getSkillProfileId = (role: string) => {
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };
  
  const baseRole = role.split(":")[0].trim();
  return roleMap[baseRole] || "123";
};

export const getBaseRole = (role: string) => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string) => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};