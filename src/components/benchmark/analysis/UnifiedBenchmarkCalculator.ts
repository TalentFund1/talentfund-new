import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { skillComparisonService } from '../../../services/benchmarking';
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";

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

export class UnifiedBenchmarkCalculator {
  private readonly LEVEL_VALUES: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };

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
      const skillState = getSkillState(skill.title, employeeId);
      const employeeLevel = skillState?.level || 'unspecified';
      const roleLevel = skill.level || 'unspecified';

      const employeeLevelValue = this.LEVEL_VALUES[employeeLevel.toLowerCase()] || 1;
      const roleLevelValue = this.LEVEL_VALUES[roleLevel.toLowerCase()] || 1;

      console.log('Comparing competency levels:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        employeeLevelValue,
        roleLevelValue
      });

      // Updated matching logic: match if role level is unspecified OR employee level is sufficient
      const isMatch = roleLevel.toLowerCase() === 'unspecified' || employeeLevelValue >= roleLevelValue;
      
      console.log(`Competency comparison result for ${skill.title}:`, {
        isMatch,
        employeeLevel,
        roleLevel,
        reason: roleLevel.toLowerCase() === 'unspecified' 
          ? 'Role level is unspecified - any employee level matches'
          : `Employee level (${employeeLevelValue}) ${isMatch ? '>=' : '<'} Role level (${roleLevelValue})`
      });

      return isMatch;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      if (!skillState) return false;
      return skillState.goalStatus === 'required' || skillState.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = toggledRoleSkills.length;

    const calculatePercentage = (count: number) => 
      Math.round((count / (totalToggledSkills || 1)) * 100);

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
      (result.skillMatchPercentage + 
       result.competencyMatchPercentage + 
       result.skillGoalMatchPercentage) / 3
    );

    console.log('UnifiedBenchmarkCalculator: Calculation complete', {
      matchingSkillsCount: matchingSkills.length,
      competencyMatchCount: competencyMatchingSkills.length,
      skillGoalMatchCount: skillGoalMatchingSkills.length,
      averagePercentage: result.averagePercentage
    });

    return result;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();