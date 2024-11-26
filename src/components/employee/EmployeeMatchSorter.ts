import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId } from "../EmployeeTable";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedRoleIds: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  if (selectedRoleIds.length === 0) return employees;

  const selectedRoleId = selectedRoleIds[0];

  // Calculate benchmarks for all employees
  const employeesWithBenchmarks = employees.map(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      selectedRoleId,
      "",
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    return {
      ...employee,
      isExactMatch: employeeRoleId === selectedRoleId,
      benchmark
    };
  });

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

  // Filter to keep only employees with benchmark > 0 or exact role matches
  const matchingEmployees = employeesWithBenchmarks.filter(
    employee => employee.isExactMatch || employee.benchmark > 0
  );

  console.log('Matching employees:', matchingEmployees);

  // Sort by exact match first, then by benchmark score
  return matchingEmployees.sort((a, b) => {
    if (a.isExactMatch && !b.isExactMatch) return -1;
    if (!a.isExactMatch && b.isExactMatch) return 1;
    return b.benchmark - a.benchmark;
  });
};