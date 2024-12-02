import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { roleSkills } from "../skills/data/roleSkills";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  if (selectedJobTitle.length === 0) return employees;

  const roleId = getSkillProfileId(selectedJobTitle[0]);
  
  console.log('Sorting employees by role match:', { 
    selectedJobTitle,
    roleId,
    totalEmployees: employees.length,
    toggledSkillsCount: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });

  // Get role skills for benchmark comparison
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  if (!roleData) {
    console.error('No role skills found for role:', roleId);
    return employees;
  }

  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  console.log('Role skills for matching:', {
    roleId,
    totalSkills: allRoleSkills.length,
    skills: allRoleSkills.map(s => s.title)
  });

  // Calculate benchmarks for all employees
  const exactMatches: (Employee & { benchmark: number })[] = [];
  const partialMatches: (Employee & { benchmark: number })[] = [];

  employees.forEach(employee => {
    const employeeLevel = getLevel(employee.role);
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    const employeeWithBenchmark = { ...employee, benchmark };
    const isExactMatch = getSkillProfileId(employee.role) === roleId;

    console.log('Employee match calculation:', {
      employee: employee.name,
      role: employee.role,
      benchmark,
      isExactMatch
    });

    if (isExactMatch) {
      exactMatches.push(employeeWithBenchmark);
    } else {
      // Add to partial matches regardless of benchmark score
      partialMatches.push(employeeWithBenchmark);
      console.log('Added to partial matches:', {
        employee: employee.name,
        role: employee.role,
        benchmark
      });
    }
  });

  // Sort both arrays by benchmark in descending order
  const sortByBenchmark = (a: Employee & { benchmark: number }, b: Employee & { benchmark: number }) => 
    (b.benchmark || 0) - (a.benchmark || 0);

  exactMatches.sort(sortByBenchmark);
  partialMatches.sort(sortByBenchmark);

  // Combine exact matches followed by partial matches
  const sortedEmployees = [...exactMatches, ...partialMatches];

  console.log('Final sorted employees:', {
    totalMatches: sortedEmployees.length,
    exactMatches: exactMatches.length,
    partialMatches: partialMatches.length
  });

  return sortedEmployees;
};