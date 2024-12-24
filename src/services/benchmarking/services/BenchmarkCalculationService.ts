import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { skillComparisonService } from './SkillComparisonService';

export class BenchmarkCalculationService {
  public calculateBenchmarkPercentage(
    employeeSkills: EmployeeSkillData[],
    roleRequirements: RoleSkillRequirement[],
    toggledSkills: Set<string>
  ): number {
    console.log('BenchmarkCalculationService: Calculating benchmark:', {
      employeeSkillCount: employeeSkills.length,
      roleRequirementCount: roleRequirements.length,
      toggledSkillsCount: toggledSkills.size
    });

    // Filter for toggled skills only
    const filteredRoleRequirements = roleRequirements.filter(skill => 
      toggledSkills.has(skill.title)
    );

    if (filteredRoleRequirements.length === 0) {
      console.log('BenchmarkCalculationService: No toggled skills found');
      return 0;
    }

    // Use the dedicated comparison service
    const overallMatch = skillComparisonService.calculateOverallMatch(
      employeeSkills,
      filteredRoleRequirements
    );

    console.log('BenchmarkCalculationService: Benchmark calculation result:', {
      overallMatch,
      totalSkills: filteredRoleRequirements.length
    });

    return overallMatch;
  }
}

export const benchmarkCalculationService = new BenchmarkCalculationService();