import { EmployeeSkillAchievement } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { SkillComparison } from '../../../components/skills/types/skillComparison';

export class LevelComparisonService {
  private getLevelPriority(level: string = 'unspecified'): number {
    const priorities: { [key: string]: number } = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return priorities[level.toLowerCase()] ?? 0;
  }

  public compareSkillLevels(
    employeeSkill: EmployeeSkillAchievement,
    roleRequirement: RoleSkillRequirement
  ): SkillComparison {
    console.log('LevelComparisonService: Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel
    });

    const employeePriority = this.getLevelPriority(employeeSkill.level);
    const requiredPriority = this.getLevelPriority(roleRequirement.minimumLevel);
    const matchPercentage = (employeePriority / Math.max(requiredPriority, 1)) * 100;

    return {
      employeeSkill,
      roleRequirement,
      matchPercentage,
      gapLevel: employeePriority - requiredPriority
    };
  }

  public calculateLevelPercentage(level: string | number): number {
    if (typeof level === 'number') {
      return Math.min(Math.max(level, 0), 100);
    }

    const levelPercentages: { [key: string]: number } = {
      'advanced': 100,
      'intermediate': 66,
      'beginner': 33,
      'unspecified': 0
    };

    const normalizedLevel = level.toString().toLowerCase();
    return levelPercentages[normalizedLevel] ?? 0;
  }

  public getProgressColor(percentage: number): string {
    if (percentage >= 90) return 'bg-primary-accent';
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  }
}

export const levelComparisonService = new LevelComparisonService();