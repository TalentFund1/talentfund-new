import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { roleSkills } from "../skills/data/roleSkills";

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
    totalEmployees: employees.length 
  });

  // First separate exact matches and calculate benchmarks for remaining employees
  const exactMatches: Employee[] = [];
  const partialMatches: Employee[] = [];

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

  const totalRequiredSkills = allRoleSkills.length;

  console.log('Role skills for matching:', {
    roleId,
    totalSkills: totalRequiredSkills,
    skills: allRoleSkills.map(s => s.title)
  });

  employees.forEach(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const isExactMatch = employeeRoleId === roleId;
    const employeeLevel = getLevel(employee.role);

    console.log('Processing employee for matching:', {
      employee: employee.name,
      employeeRole: employee.role,
      employeeRoleId,
      targetRoleId: roleId,
      isExactMatch,
      employeeLevel
    });

    // Calculate benchmark for all employees
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Calculated benchmark result:', {
      employee: employee.name,
      benchmark,
      isExactMatch,
      willBePartialMatch: !isExactMatch && benchmark > 0
    });

    const employeeWithBenchmark = {
      ...employee,
      benchmark
    };

    if (isExactMatch) {
      exactMatches.push(employeeWithBenchmark);
    } else if (benchmark > 0) {
      // Only add to partial matches if they have matching skills
      partialMatches.push(employeeWithBenchmark);
    }
  });

  // Sort partial matches by benchmark percentage in descending order
  const sortedPartialMatches = partialMatches.sort((a, b) => {
    return (b.benchmark || 0) - (a.benchmark || 0);
  });

  console.log('Final matching results:', {
    exactMatches: exactMatches.map(e => ({ 
      name: e.name, 
      role: e.role,
      benchmark: e.benchmark 
    })),
    partialMatches: sortedPartialMatches.map(e => ({ 
      name: e.name, 
      role: e.role,
      benchmark: e.benchmark 
    })),
    totalExactMatches: exactMatches.length,
    totalPartialMatches: sortedPartialMatches.length
  });

  // Combine exact matches first, followed by sorted partial matches
  return [...exactMatches, ...sortedPartialMatches];
};