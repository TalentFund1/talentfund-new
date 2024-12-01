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

  console.log('Sorting employees by role match:', { selectedRole, roleId });

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

    const isExactMatch = getSkillProfileId(employee.role) === roleId;

    console.log('Employee benchmark calculation:', {
      employeeName: employee.name,
      employeeRole: employee.role,
      employeeRoleId: getSkillProfileId(employee.role),
      selectedRoleId: roleId,
      benchmark,
      isExactMatch
    });

    return {
      ...employee,
      isExactMatch,
      benchmark
    };
  });

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

  // Filter to keep only employees with benchmark > 0 or exact role matches
  const matchingEmployees = employeesWithBenchmarks.filter(
    employee => employee.isExactMatch || employee.benchmark > 0
  );

  console.log('All matching employees:', matchingEmployees);

  // Sort by exact match first, then by benchmark score
  const sortedEmployees = matchingEmployees.sort((a, b) => {
    if (a.isExactMatch && !b.isExactMatch) return -1;
    if (!a.isExactMatch && b.isExactMatch) return 1;
    return b.benchmark - a.benchmark;
  });

  console.log('Final sorted employees:', sortedEmployees);

  return sortedEmployees;
};