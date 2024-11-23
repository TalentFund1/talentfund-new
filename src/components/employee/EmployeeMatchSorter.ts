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

  return [...employees].sort((a, b) => {
    const aExactMatch = getBaseRole(a.role) === selectedRole;
    const bExactMatch = getBaseRole(b.role) === selectedRole;

    // If both are exact matches or both are partial matches, sort by benchmark
    if (aExactMatch === bExactMatch) {
      return b.benchmark - a.benchmark;
    }

    // Prioritize exact matches
    return aExactMatch ? -1 : 1;
  });
};