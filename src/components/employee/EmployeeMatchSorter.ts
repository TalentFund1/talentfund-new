import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";

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

  // First separate exact matches and calculate benchmarks for remaining employees
  const exactMatches: Employee[] = [];
  const partialMatches: Employee[] = [];

  employees.forEach(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const isExactMatch = employeeRoleId === roleId;

    console.log('Processing employee:', {
      employee: employee.name,
      employeeRoleId,
      roleId,
      isExactMatch
    });

    // Calculate benchmark for all employees
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      getLevel(employee.role),
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Calculated benchmark:', {
      employee: employee.name,
      benchmark,
      isExactMatch
    });

    if (isExactMatch) {
      exactMatches.push({
        ...employee,
        benchmark
      });
    } else if (benchmark > 0) {
      // Only add to partial matches if benchmark > 0 and not an exact match
      partialMatches.push({
        ...employee,
        benchmark
      });
    }
  });

  // Sort partial matches by benchmark percentage in descending order
  const sortedPartialMatches = partialMatches.sort((a, b) => {
    return (b.benchmark || 0) - (a.benchmark || 0);
  });

  console.log('Match results:', {
    exactMatches: exactMatches.length,
    partialMatches: sortedPartialMatches.length,
    exactMatchDetails: exactMatches.map(e => ({ name: e.name, benchmark: e.benchmark })),
    partialMatchDetails: sortedPartialMatches.map(e => ({ name: e.name, benchmark: e.benchmark }))
  });

  // Combine exact matches first, followed by sorted partial matches
  return [...exactMatches, ...sortedPartialMatches];
};