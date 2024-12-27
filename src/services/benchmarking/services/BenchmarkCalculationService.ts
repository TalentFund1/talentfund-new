import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { unifiedBenchmarkCalculator } from '../../../components/benchmark/analysis/UnifiedBenchmarkCalculator';

export class BenchmarkCalculationService {
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

    // Use the unified calculator for calculations
    const result = unifiedBenchmarkCalculator.calculateBenchmark(
      employeeSkills,
      employeeSkills,
      'unspecified', // Default level
      'default', // Default role
      'Professional', // Default track
      (skillTitle: string) => employeeSkills.find(s => s.title === skillTitle) || {
        title: skillTitle,
        level: 'unspecified',
        goalStatus: 'unknown'
      },
      'default'
    );

    console.log('BenchmarkCalculationService: Calculation complete:', {
      averageMatch: result.averagePercentage,
      matchingSkills: result.matchingSkills.length,
      totalSkills: result.totalToggledSkills,
      competencyMatches: result.competencyMatchingSkills.length
    });

    return result.averagePercentage;
  }
}

export const benchmarkCalculationService = new BenchmarkCalculationService();