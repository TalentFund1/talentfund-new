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
  private getLevelValue(level: string): number {
    const values: { [key: string]: number } = {
      'advanced': 4,
      'intermediate': 3,
      'beginner': 2,
      'unspecified': 1
    };
    return values[level.toLowerCase()] || 1;
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
      const skillState = getSkillState(skill.title, employeeId);
      const employeeLevel = skillState?.level || 'unspecified';
      const roleLevel = skill.level || 'unspecified';

      const employeeLevelValue = this.getLevelValue(employeeLevel);
      const roleLevelValue = this.getLevelValue(roleLevel);

      console.log('Comparing competency levels:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        employeeLevelValue,
        roleLevelValue
      });

      const isMatch = employeeLevelValue >= roleLevelValue;
      console.log(`Competency comparison for ${skill.title}:`, {
        isMatch,
        reason: isMatch ? 'Employee level meets or exceeds role level' : 'Employee level below role level'
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
      averagePercentage: result.averagePercentage,
      competencyMatches: competencyMatchingSkills.map(s => ({
        skill: s.title,
        employeeLevel: getSkillState(s.title, employeeId).level,
        roleLevel: s.level
      }))
    });

    return result;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();
