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

    // If one is an exact match and the other isn't, prioritize the exact match
    if (aExactMatch !== bExactMatch) {
      return aExactMatch ? -1 : 1;
    }

    // If neither is an exact match, compare their benchmark percentages
    const aLevel = getLevel(a.role);
    const bLevel = getLevel(b.role);

    const aBenchmark = calculateBenchmarkPercentage(
      a.id,
      roleId,
      aLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    const bBenchmark = calculateBenchmarkPercentage(
      b.id,
      roleId,
      bLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    // Sort by benchmark percentage in descending order
    return bBenchmark - aBenchmark;
  });
};