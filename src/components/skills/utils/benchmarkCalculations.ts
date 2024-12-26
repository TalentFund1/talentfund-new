import { Employee } from "../../types/employeeTypes";
import { calculateBenchmarkPercentage } from "../../employee/BenchmarkCalculator";
import { getBaseRole } from "../../EmployeeTable";

export const calculateAverageBenchmark = (
  roleId: string,
  roleName: string,
  matchingEmployees: Employee[],
  getSkillCompetencyState: any,
  toggledSkills: Set<string>
) => {
  if (matchingEmployees.length === 0) return 0;

  const benchmarks = matchingEmployees.map(emp => 
    calculateBenchmarkPercentage(
      emp.id,
      roleId,
      getBaseRole(emp.role),
      getSkillCompetencyState,
      toggledSkills,
      getSkillCompetencyState
    )
  );

  const sum = benchmarks.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / benchmarks.length);
};

export const getBenchmarkColor = (benchmark: number) => {
  if (benchmark >= 90) return 'bg-green-100 text-green-800';
  if (benchmark >= 70) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};