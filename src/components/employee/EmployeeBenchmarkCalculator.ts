import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../EmployeeTable";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  getSkillCompetencyState: any
): Employee[] => {
  return employees.map(employee => {
    let benchmark = 0;
    
    if (selectedJobTitle.length > 0) {
      const roleId = getSkillProfileId(selectedJobTitle[0]);
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        getSkillCompetencyState
      );
    } else {
      const roleId = getSkillProfileId(employee.role);
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        getSkillCompetencyState
      );
    }
    
    return { ...employee, benchmark };
  });
};