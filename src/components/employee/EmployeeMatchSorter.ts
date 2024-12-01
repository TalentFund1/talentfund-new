import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId } from "../EmployeeTable";

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
  const potentialPartialMatches: Employee[] = [];

  employees.forEach(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const isExactMatch = employeeRoleId === roleId;

    if (isExactMatch) {
      exactMatches.push(employee);
    } else {
      // Calculate benchmark for potential partial matches
      const benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        getLevel(employee.role),
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );

      if (benchmark > 0) {
        potentialPartialMatches.push({
          ...employee,
          benchmark
        });
      }
    }
  });

  // Sort partial matches by benchmark percentage in descending order
  const sortedPartialMatches = potentialPartialMatches.sort((a, b) => {
    return (b.benchmark || 0) - (a.benchmark || 0);
  });

  console.log('Sorted employees:', {
    exactMatches: exactMatches.length,
    partialMatches: sortedPartialMatches.length
  });

  // Combine exact matches first, followed by sorted partial matches
  return [...exactMatches, ...sortedPartialMatches];
};

const getLevel = (role: string) => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};