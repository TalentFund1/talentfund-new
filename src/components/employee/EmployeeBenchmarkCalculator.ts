import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { CompetencyState } from "../skills/competency/state/types";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: Record<string, CompetencyState>,
  toggledSkills: Set<string>
): Employee[] => {
  return employees.map(employee => {
    let benchmark = 0;
    
    if (selectedJobTitle.length > 0) {
      // Calculate benchmark against selected job title
      const roleId = getSkillProfileId(selectedJobTitle[0]);
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        toggledSkills
      );
    } else {
      // Calculate benchmark against employee's current role
      const roleId = getSkillProfileId(employee.role);
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        toggledSkills
      );
    }
    
    return { ...employee, benchmark };
  });
};