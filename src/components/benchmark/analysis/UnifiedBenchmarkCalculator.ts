import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { SkillLevel } from "../../skills/types/sharedSkillTypes";
import { RoleSkillRequirement } from "../../skills/types/roleSkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";

export interface BenchmarkResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
  skillMatchPercentage: number;
  competencyMatchPercentage: number;
  skillGoalMatchPercentage: number;
  averagePercentage: number;
}

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

export class UnifiedBenchmarkCalculator {
  private doesLevelMatch(employeeLevel: SkillLevel, requiredLevel: SkillLevel): boolean {
    console.log('Comparing skill levels:', {
      employeeLevel,
      requiredLevel
    });

    // If role requirement is unspecified, any employee level is a match
    if (requiredLevel === 'unspecified') {
      console.log('Role level is unspecified - counting as match');
      return true;
    }

    const levelValues = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };

    const employeeValue = levelValues[employeeLevel] || 0;
    const requiredValue = levelValues[requiredLevel] || 0;

    console.log('Level comparison:', {
      employeeLevel,
      requiredLevel,
      employeeValue,
      requiredValue,
      isMatch: employeeValue >= requiredValue
    });

    return employeeValue >= requiredValue;
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
    console.log('Comparing skill levels:', {
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

    console.log('Comparison result:', result);
    return result;
  }

  public calculateOverallMatch(
    employeeSkills: ReadonlyArray<EmployeeSkillData>,
    roleRequirements: ReadonlyArray<RoleSkillRequirement>
  ): ComparisonMetrics {
    console.log('Calculating overall match:', {
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
      console.log('No role requirements to compare against');
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

    console.log('Comparison metrics:', metrics);
    return metrics;
  }

  calculateBenchmark(
    toggledRoleSkills: UnifiedSkill[],
    employeeSkills: UnifiedSkill[],
    comparisonLevel: string,
    selectedRole: string,
    track: string,
    getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData,
    employeeId: string
  ): BenchmarkResult {
    console.log('UnifiedBenchmarkCalculator: Starting benchmark calculation', {
      toggledSkillsCount: toggledRoleSkills.length,
      employeeSkillsCount: employeeSkills.length,
      level: comparisonLevel,
      role: selectedRole,
      track
    });

    const matchingSkills = toggledRoleSkills.filter(roleSkill =>
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkill = getSkillState(skill.title, employeeId);
      const employeeLevel = employeeSkill?.level || 'unspecified';
      
      // Get the role's required level for this skill
      const roleLevel = skill.level || 'unspecified';
      
      // Create role requirement object
      const roleRequirement: RoleSkillRequirement = {
        id: `${selectedRole}-${skill.title}`,
        title: skill.title,
        minimumLevel: roleLevel as SkillLevel,
        requirementLevel: 'required',
        subcategory: skill.subcategory,
        category: skill.category,
        businessCategory: skill.businessCategory,
        weight: skill.weight,
        benchmarks: skill.benchmarks,
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          confidence: 'medium'
        }
      };

      // Use skillComparisonService for consistent level comparison
      const comparison = this.compareSkillLevels(
        {
          ...employeeSkill,
          level: employeeLevel as SkillLevel
        },
        roleRequirement
      );

      console.log('Competency comparison result:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        matchPercentage: comparison.matchPercentage,
        employeeSkillDetails: employeeSkill,
        roleRequirementDetails: roleRequirement
      });

      return comparison.matchPercentage === 100;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = toggledRoleSkills.length;

    const calculatePercentage = (count: number) => 
      totalToggledSkills > 0 ? Math.round((count / totalToggledSkills) * 100) : 0;

    const result = {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalToggledSkills,
      skillMatchPercentage: calculatePercentage(matchingSkills.length),
      competencyMatchPercentage: calculatePercentage(competencyMatchingSkills.length),
      skillGoalMatchPercentage: calculatePercentage(skillGoalMatchingSkills.length),
      averagePercentage: 0
    };

    result.averagePercentage = Math.round(
      (result.skillMatchPercentage + result.competencyMatchPercentage + result.skillGoalMatchPercentage) / 3
    );

    console.log('UnifiedBenchmarkCalculator: Calculation complete', {
      matchingSkillsCount: matchingSkills.length,
      competencyMatchCount: competencyMatchingSkills.length,
      skillGoalMatchCount: skillGoalMatchingSkills.length,
      averagePercentage: result.averagePercentage,
      competencyMatches: competencyMatchingSkills.map(s => ({
        title: s.title,
        employeeLevel: getSkillState(s.title, employeeId)?.level,
        roleLevel: s.level
      }))
    });

    return result;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();
