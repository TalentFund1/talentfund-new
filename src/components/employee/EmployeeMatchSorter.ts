import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "./utils/profileUtils";
import { roleSkills } from "../skills/data/roleSkills";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedRole: ReadonlyArray<string>,
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  if (selectedRole.length === 0) return employees;

  const selectedRoleId = getSkillProfileId(selectedRole[0]);
  
  console.log('Sorting employees by role match:', { 
    selectedRole, 
    selectedRoleId,
    totalEmployees: employees.length 
  });

  // First separate exact matches and calculate benchmarks for remaining employees
  const exactMatches: Employee[] = [];
  const partialMatches: Employee[] = [];

  // Get role skills for benchmark comparison
  const roleData = roleSkills[selectedRoleId as keyof typeof roleSkills];
  if (!roleData) {
    console.error('No role skills found for role:', selectedRoleId);
    return employees;
  }

  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  console.log('Role skills for matching:', {
    roleId: selectedRoleId,
    totalSkills: allRoleSkills.length,
    skills: allRoleSkills.map(s => s.title)
  });

  employees.forEach(employee => {
    // Get the role ID from the employee's assigned role
    const employeeRoleId = getSkillProfileId(employee.role);
    const employeeLevel = getLevel(employee.role);
    
    // Compare role IDs directly for exact matches
    const isExactMatch = employeeRoleId === selectedRoleId;

    // Calculate comprehensive benchmark using the same method as benchmark analysis
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      selectedRoleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Processing employee for matching:', {
      employee: employee.name,
      employeeRole: employee.role,
      employeeRoleId,
      targetRoleId: selectedRoleId,
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
    } else if (benchmark > 70) {
      // Only add to partial matches if they have matching skills (benchmark > 70%)
      partialMatches.push(employeeWithBenchmark);
      console.log('Added to partial matches:', {
        employee: employee.name,
        role: employee.role,
        benchmark,
        skills: allRoleSkills.length
      });
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
