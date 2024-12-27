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
  private getLevelValue(level: string): number {
    const levelValues = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return levelValues[level.toLowerCase()] || 0;
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
    const requiredValue = this.getLevelValue(roleRequirement.minimumLevel);

    console.log('Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      employeeValue,
      requiredLevel: roleRequirement.minimumLevel,
      requiredValue
    });

    // Pure numerical comparison using division
    const matchPercentage = requiredValue === 0 ? 
      (employeeValue > 0 ? 100 : 0) : 
      Math.min(100, (employeeValue / requiredValue) * 100);

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

    employeeSkills.forEach(skill => {
      if (!roleRequirements.some(req => req.title === skill.title)) {
        metrics.exceedingSkills.push(skill.title);
      }
    });

    metrics.averageMatchPercentage = metrics.totalSkills > 0 ? 
      totalMatchPercentage / metrics.totalSkills : 0;

    return metrics;
  }
}

export const skillComparisonService = new SkillComparisonService();