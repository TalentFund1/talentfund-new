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

  // Calculate benchmarks for all employees against selected role
  const employeesWithBenchmarks = employees.map(employee => {
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      getLevel(employee.role),
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );
    return { ...employee, calculatedBenchmark: benchmark };
  });

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

  return employeesWithBenchmarks
    .filter(employee => employee.calculatedBenchmark > 0)
    .sort((a, b) => {
      const aExactMatch = getBaseRole(a.role) === selectedRole;
      const bExactMatch = getBaseRole(b.role) === selectedRole;

      // If one is exact match and other isn't, prioritize exact match
      if (aExactMatch !== bExactMatch) {
        return aExactMatch ? -1 : 1;
      }

      // If both are exact matches or both are partial matches,
      // sort by benchmark score
      return b.calculatedBenchmark - a.calculatedBenchmark;
    });
};