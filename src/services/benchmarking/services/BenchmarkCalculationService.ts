import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { skillComparisonService } from './SkillComparisonService';

class BenchmarkCalculationService {
  private readonly LEVEL_VALUES: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };

  private getLevelValue(level: string): number {
    return this.LEVEL_VALUES[level.toLowerCase()] || 1;
  }

  public calculateBenchmarkPercentage(
    employeeSkills: ReadonlyArray<EmployeeSkillData>,
    roleRequirements: ReadonlyArray<RoleSkillRequirement>,
    toggledSkills: ReadonlySet<string>
  ): number {
    console.log('BenchmarkCalculationService: Starting benchmark calculation:', {
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

    // Use the dedicated comparison service for calculations
    const metrics = skillComparisonService.calculateOverallMatch(
      employeeSkills,
      filteredRoleRequirements
    );

    console.log('BenchmarkCalculationService: Calculation complete:', {
      averageMatch: metrics.averageMatchPercentage,
      matchingSkills: metrics.matchingSkills,
      totalSkills: metrics.totalSkills,
      missingSkills: metrics.missingSkills.length,
      exceedingSkills: metrics.exceedingSkills.length
    });

    return metrics.averageMatchPercentage;
  }
}

export const benchmarkCalculationService = new BenchmarkCalculationService();
