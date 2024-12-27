import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";
import { skillComparisonService } from "../../../services/benchmarking/services/SkillComparisonService";
import { SkillLevel } from "../../skills/types/sharedSkillTypes";

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
      const comparison = skillComparisonService.compareSkillLevels(
        skillState,
        { ...skill, minimumLevel: skill.level as SkillLevel }
      );
      return comparison.matchPercentage === 100;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = toggledRoleSkills.length;

    const calculatePercentage = (count: number) => 
      totalToggledSkills > 0 ? Math.round((count / totalToggledSkills) * 100) : 0;

    const skillMatchPercentage = calculatePercentage(matchingSkills.length);
    const competencyMatchPercentage = calculatePercentage(competencyMatchingSkills.length);
    const skillGoalMatchPercentage = calculatePercentage(skillGoalMatchingSkills.length);
    const averagePercentage = Math.round(
      (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
    );

    console.log('UnifiedBenchmarkCalculator: Calculation complete', {
      matchingSkillsCount: matchingSkills.length,
      competencyMatchCount: competencyMatchingSkills.length,
      skillGoalMatchCount: skillGoalMatchingSkills.length,
      averagePercentage
    });

    return {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalToggledSkills,
      skillMatchPercentage,
      competencyMatchPercentage,
      skillGoalMatchPercentage,
      averagePercentage
    };
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();