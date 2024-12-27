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

  private doesLevelMatch(employeeLevel: SkillLevel, requiredLevel: SkillLevel): boolean {
    const employeeLevelValue = this.getLevelValue(employeeLevel);
    const requiredLevelValue = this.getLevelValue(requiredLevel);

    console.log('Comparing skill levels:', {
      employeeLevel,
      requiredLevel,
      employeeLevelValue,
      requiredLevelValue
    });

    // Advanced matches everything
    if (employeeLevelValue === 3) return true;
    
    // Intermediate matches intermediate, beginner, and unspecified
    if (employeeLevelValue === 2) {
      return requiredLevelValue <= 2;
    }
    
    // Beginner matches beginner and unspecified
    if (employeeLevelValue === 1) {
      return requiredLevelValue <= 1;
    }
    
    // Unspecified only matches unspecified
    return employeeLevelValue === requiredLevelValue;
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

    const isMatch = this.doesLevelMatch(
      employeeSkill.level, 
      roleRequirement.minimumLevel as SkillLevel
    );

    const employeeLevelValue = this.getLevelValue(employeeSkill.level);
    const requiredLevelValue = this.getLevelValue(roleRequirement.minimumLevel as SkillLevel);
    
    const matchPercentage = isMatch ? 100 : 
      (employeeLevelValue / Math.max(requiredLevelValue, 1)) * 100;

    const result = {
      skillTitle: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel as SkillLevel,
      matchPercentage,
      gapLevel: employeeLevelValue - requiredLevelValue
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