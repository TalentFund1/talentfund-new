import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  if (selectedJobTitle.length === 0) return employees;

  const selectedRole = selectedJobTitle[0];
  const roleId = getSkillProfileId(selectedRole);

  // Calculate benchmark percentages for all employees against the selected role
  const employeesWithBenchmarks = employees.map(employee => {
    const exactMatch = getBaseRole(employee.role) === selectedRole;
    const benchmarkScore = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      getLevel(selectedRole),
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    return {
      ...employee,
      exactMatch,
      benchmarkScore
    };
  });

  // Filter out employees with 0% benchmark score
  const validEmployees = employeesWithBenchmarks.filter(emp => 
    emp.exactMatch || emp.benchmarkScore > 0
  );

  // Sort employees:
  // 1. Exact role matches first
  // 2. Then by benchmark percentage for partial matches
  return validEmployees.sort((a, b) => {
    if (a.exactMatch && !b.exactMatch) return -1;
    if (!a.exactMatch && b.exactMatch) return 1;
    
    // If both are exact matches or both are partial matches,
    // sort by benchmark score
    return b.benchmarkScore - a.benchmarkScore;
  });
};