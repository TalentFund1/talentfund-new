import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../../components/skills/types/roleSkillTypes';
import { SkillLevel } from '../../../components/skills/types/sharedSkillTypes';

interface SkillComparisonResult {
  skillTitle: string;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
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
  private doesLevelMatch(employeeLevel: SkillLevel, requiredLevel: SkillLevel): boolean {
    console.log('Comparing skill levels:', {
      employeeLevel,
      requiredLevel
    });

    // Advanced matches everything
    if (employeeLevel === 'advanced') return true;
    
    // Intermediate matches intermediate, beginner, and unspecified
    if (employeeLevel === 'intermediate') {
      return ['intermediate', 'beginner', 'unspecified'].includes(requiredLevel);
    }
    
    // Beginner matches beginner and unspecified
    if (employeeLevel === 'beginner') {
      return ['beginner', 'unspecified'].includes(requiredLevel);
    }
    
    // Unspecified only matches unspecified
    return employeeLevel === requiredLevel;
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
    console.log('SkillComparisonService: Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel
    });

    const isMatch = this.doesLevelMatch(
      employeeSkill.level as SkillLevel, 
      roleRequirement.minimumLevel as SkillLevel
    );

    const result = {
      skillTitle: employeeSkill.title,
      employeeLevel: employeeSkill.level as SkillLevel,
      requiredLevel: roleRequirement.minimumLevel as SkillLevel,
      matchPercentage: isMatch ? 100 : 0
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

    roleRequirements.forEach(requirement => {
      const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
      
      if (employeeSkill) {
        const comparison = this.compareSkillLevels(employeeSkill, requirement);
        if (comparison.matchPercentage === 100) {
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

    metrics.averageMatchPercentage = metrics.totalSkills > 0 
      ? (metrics.matchingSkills / metrics.totalSkills) * 100 
      : 0;

    console.log('SkillComparisonService: Comparison metrics:', metrics);
    return metrics;
  }
}

export const skillComparisonService = new SkillComparisonService();