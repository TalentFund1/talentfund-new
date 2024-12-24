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
}

export const levelComparisonService = new LevelComparisonService();