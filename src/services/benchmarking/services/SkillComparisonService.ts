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

interface ComparisonMetrics {
  totalSkills: number;
  matchingSkills: number;
  averageMatchPercentage: number;
  missingSkills: string[];
  exceedingSkills: string[];
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
    console.log('SkillComparisonService: Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel
    });

    const employeeLevelValue = this.getLevelValue(employeeSkill.level);
    const requiredLevelValue = this.getLevelValue(roleRequirement.minimumLevel);
    
    const gapLevel = Math.max(0, requiredLevelValue - employeeLevelValue);
    const matchPercentage = Math.min(100, (employeeLevelValue / requiredLevelValue) * 100);

    const result = {
      skillTitle: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel,
      matchPercentage: requiredLevelValue === 0 ? 100 : matchPercentage,
      gapLevel
    };

    console.log('SkillComparisonService: Comparison result:', result);
    return result;
  }

  public calculateOverallMatch(
    employeeSkills: ReadonlyArray<EmployeeSkillData>,
    roleRequirements: ReadonlyArray<RoleSkillRequirement>
  ): ComparisonMetrics {
    console.log('SkillComparisonService: Calculating overall match:', {
      employeeSkillCount: employeeSkills.length,
      roleRequirementCount: roleRequirements.length
    });

    const metrics: ComparisonMetrics = {
      totalSkills: roleRequirements.length,
      matchingSkills: 0,
      averageMatchPercentage: 0,
      missingSkills: [],
      exceedingSkills: []
    };

    if (roleRequirements.length === 0) {
      console.log('SkillComparisonService: No role requirements to compare against');
      return metrics;
    }

    let totalMatchPercentage = 0;

    // Find matching and missing skills
    roleRequirements.forEach(requirement => {
      const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
      
      if (employeeSkill) {
        const comparison = this.compareSkillLevels(employeeSkill, requirement);
        totalMatchPercentage += comparison.matchPercentage;
        if (comparison.matchPercentage >= 100) {
          metrics.matchingSkills++;
        }
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

    metrics.averageMatchPercentage = Math.round(totalMatchPercentage / roleRequirements.length);

    console.log('SkillComparisonService: Comparison metrics:', metrics);
    return metrics;
  }
}

export const skillComparisonService = new SkillComparisonService();