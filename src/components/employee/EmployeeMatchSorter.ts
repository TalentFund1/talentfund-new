import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getBaseRole, getLevel } from "../utils/roleUtils";

export const sortEmployeesByRoleMatch = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  if (selectedJobTitle.length === 0) {
    // If no role is selected, benchmark against their own assigned role
    return employees.map(employee => {
      const roleId = getSkillProfileId(employee.role);
      
      console.log(`Default role benchmark for ${employee.name}:`, {
        roleId,
        employeeRole: employee.role
      });

      const benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        getLevel(employee.role),
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );

      return {
        ...employee,
        isExactMatch: true, // When comparing against own role
        benchmark
      };
    });
  }

  const selectedRole = selectedJobTitle[0];
  const roleId = getSkillProfileId(selectedRole);
  const isManagerRole = selectedRole.toLowerCase().includes('manager');

  console.log('Selected role benchmark parameters:', {
    selectedRole,
    roleId,
    isManagerRole
  });

  // Calculate benchmarks for all employees against selected role
  const employeesWithBenchmarks = employees.map(employee => {
    const isEmployeeManager = employee.role.toLowerCase().includes('manager');
    
    // Only calculate benchmark if role types match (manager vs non-manager)
    const shouldCalculateBenchmark = isManagerRole === isEmployeeManager;
    
    console.log(`Role match check for ${employee.name}:`, {
      isEmployeeManager,
      isManagerRole,
      shouldCalculateBenchmark
    });

    const benchmark = shouldCalculateBenchmark ? calculateBenchmarkPercentage(
      employee.id,
      roleId,
      getLevel(employee.role),
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    ) : 0;

    return {
      ...employee,
      isExactMatch: getBaseRole(employee.role) === selectedRole,
      benchmark
    };
  });

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

  // Filter to keep only employees with benchmark > 0 or exact role matches
  const matchingEmployees = employeesWithBenchmarks.filter(
    employee => employee.isExactMatch || employee.benchmark > 0
  );

  console.log('Matching employees:', matchingEmployees);

  // Sort by exact match first, then by benchmark score
  return matchingEmployees.sort((a, b) => {
    if (a.isExactMatch && !b.isExactMatch) return -1;
    if (!a.isExactMatch && b.isExactMatch) return 1;
    return b.benchmark - a.benchmark;
  });
};
