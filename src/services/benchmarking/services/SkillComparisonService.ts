import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { SkillLevel } from '../../../components/skills/types/sharedSkillTypes';

interface SkillComparisonResult {
  skillTitle: string;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  matchPercentage: number;
  gapLevel: number;
}

class SkillComparisonService {
  private getLevelValue(level: SkillLevel): number {
    const levelValues: Record<SkillLevel, number> = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return levelValues[level] || 0;
  }

  public compareSkillLevels(
    employeeSkill: EmployeeSkillData,
    roleRequirement: RoleSkillRequirement
  ): SkillComparisonResult {
    console.log('Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel
    });

    const employeeLevelValue = this.getLevelValue(employeeSkill.level);
    const requiredLevelValue = this.getLevelValue(roleRequirement.minimumLevel);
    
    const gapLevel = Math.max(0, requiredLevelValue - employeeLevelValue);
    const matchPercentage = Math.min(100, (employeeLevelValue / requiredLevelValue) * 100);

    return {
      skillTitle: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel,
      matchPercentage: requiredLevelValue === 0 ? 100 : matchPercentage,
      gapLevel
    };
  }

  public calculateOverallMatch(
    employeeSkills: EmployeeSkillData[],
    roleRequirements: RoleSkillRequirement[]
  ): number {
    console.log('Calculating overall match:', {
      employeeSkillCount: employeeSkills.length,
      roleRequirementCount: roleRequirements.length
    });

    if (roleRequirements.length === 0) return 0;

    const matchingSkills = roleRequirements.map(requirement => {
      const employeeSkill = employeeSkills.find(skill => 
        skill.title === requirement.title
      );

      if (!employeeSkill) {
        return 0;
      }

      const comparison = this.compareSkillLevels(employeeSkill, requirement);
      return comparison.matchPercentage;
    });

    const totalMatch = matchingSkills.reduce((sum, match) => sum + match, 0);
    return Math.round(totalMatch / roleRequirements.length);
  }
}

export const skillComparisonService = new SkillComparisonService();