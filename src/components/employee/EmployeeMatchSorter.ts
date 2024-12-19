import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { roleSkills } from "../skills/data/roleSkills";
import { CompetencyState } from "../skills/competency/state/types";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: Record<string, CompetencyState>
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
  ];

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
      currentStates
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

  // Sort partial matches by benchmark percentage
  const sortedPartialMatches = partialMatches.sort((a, b) => {
    return (b.benchmark || 0) - (a.benchmark || 0);
  });

  return [...exactMatches, ...sortedPartialMatches];
};