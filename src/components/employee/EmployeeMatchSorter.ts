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
  const employeesWithBenchmarks = employees.map(employee => {
    const employeeLevel = getLevel(employee.role);
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Employee benchmark calculation:', {
      employee: employee.name,
      role: employee.role,
      benchmark,
      roleId
    });

    return {
      ...employee,
      benchmark
    };
  });

  // Filter to only show employees with benchmarks > 0%
  const matchingEmployees = employeesWithBenchmarks.filter(emp => emp.benchmark > 0);

  // Sort by benchmark percentage in descending order
  return matchingEmployees.sort((a, b) => (b.benchmark || 0) - (a.benchmark || 0));
};