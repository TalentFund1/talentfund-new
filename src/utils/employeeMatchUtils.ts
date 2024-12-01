import { Employee } from "../components/types/employeeTypes";
import { calculateBenchmarkPercentage } from "../components/employee/BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "./roleUtils";
import { roleSkills } from "../components/skills/data/roleSkills";

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

  console.log('Role skills for matching:', {
    roleId,
    totalSkills: allRoleSkills.length,
    skills: allRoleSkills.map(s => s.title)
  });

  employees.forEach(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const employeeLevel = getLevel(employee.role);
    const isExactMatch = employeeRoleId === roleId;

    // Calculate benchmark for all employees
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Processing employee for matching:', {
      employee: employee.name,
      employeeRole: employee.role,
      employeeRoleId,
      targetRoleId: roleId,
      isExactMatch,
      benchmark,
      employeeLevel
    });

    const employeeWithBenchmark = {
      ...employee,
      benchmark
    };

    if (isExactMatch) {
      exactMatches.push(employeeWithBenchmark);
    } else if (benchmark > 0) {
      partialMatches.push(employeeWithBenchmark);
    }
  });

  // Sort partial matches by benchmark percentage in descending order
  const sortedPartialMatches = partialMatches.sort((a, b) => {
    return (b.benchmark || 0) - (a.benchmark || 0);
  });

  return [...exactMatches, ...sortedPartialMatches];
};