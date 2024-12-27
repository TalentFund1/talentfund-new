import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';

interface SkillComparisonResult {
  skillTitle: string;
  employeeLevel: string;
  requiredLevel: string;
  matchPercentage: number;
}

interface ComparisonMetrics {
  totalSkills: number;
  matchingSkills: number;
  averageMatchPercentage: number;
  missingSkills: string[];
  exceedingSkills: string[];
}

class SkillComparisonService {
  private readonly MAX_LEVEL_VALUE = 3;
  private readonly LEVEL_VALUES: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };

  public getLevelValue(level: string): number {
    return this.LEVEL_VALUES[level.toLowerCase()] || 0;
  }

  public getProgressColor(percentage: number): string {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  public compareSkillLevels(
    employeeSkill: EmployeeSkillData,
    roleRequirement: RoleSkillRequirement
  ): SkillComparisonResult {
    const employeeValue = this.getLevelValue(employeeSkill.level);

    console.log('Comparing skill levels numerically:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      employeeValue,
      maxValue: this.MAX_LEVEL_VALUE
    });

    // Pure numerical comparison based on absolute skill level
    const matchPercentage = (employeeValue / this.MAX_LEVEL_VALUE) * 100;

    return {
      skillTitle: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel,
      matchPercentage
    };
  }

  public calculateOverallMatch(
    employeeSkills: ReadonlyArray<EmployeeSkillData>,
    roleRequirements: ReadonlyArray<RoleSkillRequirement>
  ): ComparisonMetrics {
    const metrics: ComparisonMetrics = {
      totalSkills: roleRequirements.length,
      matchingSkills: 0,
      averageMatchPercentage: 0,
      missingSkills: [],
      exceedingSkills: []
    };

    if (roleRequirements.length === 0) {
      return metrics;
    }

    let totalMatchPercentage = 0;

    roleRequirements.forEach(requirement => {
      const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
      
      if (employeeSkill) {
        const comparison = this.compareSkillLevels(employeeSkill, requirement);
        totalMatchPercentage += comparison.matchPercentage;
        metrics.matchingSkills++;
      } else {
        metrics.missingSkills.push(requirement.title);
      }
    });

    // Find exceeding skills
    employeeSkills.forEach(skill => {
      if (!roleRequirements.some(req => req.title === skill.title)) {
        metrics.exceedingSkills.push(skill.title);
      }
    });

    metrics.averageMatchPercentage = metrics.totalSkills > 0 
      ? totalMatchPercentage / metrics.totalSkills 
      : 0;

    return metrics;
  }
}

export const skillComparisonService = new SkillComparisonService();