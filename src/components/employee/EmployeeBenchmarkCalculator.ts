import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../utils/profileUtils";
import { unifiedBenchmarkCalculator } from "../benchmark/analysis/UnifiedBenchmarkCalculator";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  console.log('Calculating employee benchmarks:', {
    employeeCount: employees.length,
    selectedJobTitle,
    toggledSkillsCount: toggledSkills.size
  });

  return employees.map(employee => {
    const roleId = selectedJobTitle.length > 0 
      ? getSkillProfileId(selectedJobTitle[0])
      : getSkillProfileId(employee.role);
      
    const level = getLevel(employee.role);
    const employeeSkills = getEmployeeSkills(employee.id);

    console.log('Processing employee benchmark:', {
      employeeId: employee.id,
      roleId,
      level,
      skillCount: employeeSkills.length
    });

    const { averagePercentage: benchmark } = unifiedBenchmarkCalculator.calculateBenchmark(
      employeeSkills,
      employeeSkills,
      level,
      roleId,
      'Professional', // Default track, should be retrieved from context if needed
      currentStates,
      employee.id
    );

    console.log('Employee benchmark result:', {
      employeeId: employee.id,
      benchmark
    });

    return { ...employee, benchmark };
  });
};
