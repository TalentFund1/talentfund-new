import { Employee } from "../types/employeeTypes";

export const filterEmployeesByName = (employees: Employee[], searchQuery: string): Employee[] => {
  if (!searchQuery) return employees;
  
  const query = searchQuery.toLowerCase();
  return employees.filter(employee => 
    employee.name.toLowerCase().includes(query)
  );
};

export const filterEmployeesByDepartment = (employees: Employee[], departments: string[]): Employee[] => {
  if (departments.length === 0) return employees;
  return employees.filter(employee => departments.includes(employee.department));
};

export const filterEmployeesByJobTitle = (employees: Employee[], jobTitles: string[], getBaseRole: (role: string) => string): Employee[] => {
  if (jobTitles.length === 0) return employees;
  return employees.filter(employee => jobTitles.includes(getBaseRole(employee.role)));
};

export const filterEmployeesByLevel = (employees: Employee[], levels: string[], getLevel: (role: string) => string): Employee[] => {
  if (levels.length === 0) return employees;
  return employees.filter(employee => levels.includes(getLevel(employee.role)));
};

export const filterEmployeesByOffice = (employees: Employee[], offices: string[]): Employee[] => {
  if (offices.length === 0) return employees;
  return employees.filter(employee => offices.includes(employee.location.split(',')[0].trim()));
};

export const filterEmployeesByEmploymentType = (employees: Employee[], types: string[]): Employee[] => {
  if (types.length === 0) return employees;
  return employees.filter(employee => types.includes(employee.category));
};