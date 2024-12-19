import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { roleSkills } from "../skills/data/roleSkills";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
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

  const exactMatches: Employee[] = [];
  const partialMatches: Employee[] = [];

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

    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      employeeLevel,
      currentStates,
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
      console.log('Added to partial matches:', {
        employee: employee.name,
        role: employee.role,
        benchmark,
        skills: allRoleSkills.length
      });
    }
  });

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

  return [...exactMatches, ...sortedPartialMatches];
};