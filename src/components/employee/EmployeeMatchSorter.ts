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

  console.log('Sorting employees by role match:', {
    selectedRole,
    roleId,
    employeeCount: employees.length
  });

  // Calculate benchmarks for all employees
  const employeesWithBenchmarks = employees.map(employee => {
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      getLevel(employee.role),
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    const isExactMatch = getBaseRole(employee.role) === selectedRole;
    const isPartialMatch = !isExactMatch && benchmark > 0;

    console.log('Employee benchmark calculation:', {
      employeeId: employee.id,
      employeeName: employee.name,
      employeeRole: employee.role,
      benchmark,
      isExactMatch,
      isPartialMatch
    });

    return {
      ...employee,
      isExactMatch,
      isPartialMatch,
      benchmark
    };
  });

  // Include all employees with either:
  // 1. Exact role matches
  // 2. Partial matches (any benchmark score > 0)
  const matchingEmployees = employeesWithBenchmarks;

  console.log('Matching employees:', {
    total: matchingEmployees.length,
    matches: matchingEmployees.map(emp => ({
      name: emp.name,
      isExactMatch: emp.isExactMatch,
      isPartialMatch: emp.isPartialMatch,
      benchmark: emp.benchmark
    }))
  });

  // Sort by:
  // 1. Exact matches first
  // 2. Then by benchmark score
  return matchingEmployees.sort((a, b) => {
    if (a.isExactMatch && !b.isExactMatch) return -1;
    if (!a.isExactMatch && b.isExactMatch) return 1;
    return b.benchmark - a.benchmark;
  });
};