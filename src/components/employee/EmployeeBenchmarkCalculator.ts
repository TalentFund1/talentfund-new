import { Employee } from "../types/employeeTypes";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "../utils/roleUtils";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): Employee[] => {
  return employees.map(employee => {
    let benchmark = 0;
    
    if (selectedJobTitle.length > 0) {
      // Calculate benchmark against selected job title
      const roleId = getSkillProfileId(selectedJobTitle[0]);
      if (!roleId) {
        console.warn('Invalid role ID for selected job title:', selectedJobTitle[0]);
        return { ...employee, benchmark: 0 };
      }
      
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );
    } else {
      // Calculate benchmark against employee's current role
      const roleId = getSkillProfileId(employee.role);
      if (!roleId) {
        console.warn('Invalid role ID for employee role:', employee.role);
        return { ...employee, benchmark: 0 };
      }
      
      const level = getLevel(employee.role);
      benchmark = calculateBenchmarkPercentage(
        employee.id,
        roleId,
        level,
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      );
    }
    
    return { ...employee, benchmark };
  });
};