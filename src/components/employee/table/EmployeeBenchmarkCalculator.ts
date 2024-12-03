import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../../EmployeeTable";
import { calculateBenchmarkPercentage } from "../BenchmarkCalculator";

export const calculateEmployeeBenchmarks = (
  employees: Employee[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): (Employee & { benchmark?: number })[] => {
  console.log('Calculating benchmarks for employees:', employees.length);
  
  return employees.map(employee => {
    const roleId = getSkillProfileId(employee.role);
    const level = getLevel(employee.role);
    const benchmark = calculateBenchmarkPercentage(
      employee.id,
      roleId,
      level,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );

    console.log('Calculated benchmark:', {
      employee: employee.name,
      role: employee.role,
      benchmark
    });

    return { ...employee, benchmark };
  });
};