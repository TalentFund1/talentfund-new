import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  selectedRoleTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  return employees.map(employee => {
    let benchmark = 0;
    
    if (selectedRoleTitle.length > 0) {
      // Use the selected role ID directly
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        selectedRoleTitle[0],
        getLevel(employee.role),
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );
    }
    
    return { ...employee, benchmark };
  });
};