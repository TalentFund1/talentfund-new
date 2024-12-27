import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { benchmarkingService } from "../../../services/benchmarking";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

export class BenchmarkCalculator {
  private getSkillCompetencyState: ReturnType<typeof useCompetencyStateReader>['getSkillCompetencyState'];

  constructor(getSkillCompetencyState: ReturnType<typeof useCompetencyStateReader>['getSkillCompetencyState']) {
    this.getSkillCompetencyState = getSkillCompetencyState;
  }

  calculateMatchingSkills(
    toggledRoleSkills: UnifiedSkill[],
    employeeSkills: UnifiedSkill[],
    comparisonLevel: string,
    selectedRole: string,
  ) {
    console.log('BenchmarkCalculator: Calculating matching skills:', {
      toggledSkillsCount: toggledRoleSkills.length,
      employeeSkillsCount: employeeSkills.length,
      level: comparisonLevel,
      roleId: selectedRole
    });

    const matchingSkills = toggledRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      return employeeSkill !== undefined;
    });

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const roleSkillState = this.getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
      if (!roleSkillState) return false;

      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      if (!employeeSkill) return false;

      const comparison = benchmarkingService.compareSkillLevels(
        { title: skill.title, level: employeeSkill.level },
        { title: skill.title, minimumLevel: roleSkillState.level }
      );

      return comparison.matchPercentage >= 100;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      return employeeSkill?.goalStatus === 'required' || employeeSkill?.goalStatus === 'skill_goal';
    });

    console.log('BenchmarkCalculator: Matching skills calculated:', {
      totalMatching: matchingSkills.length,
      competencyMatching: competencyMatchingSkills.length,
      skillGoalMatching: skillGoalMatchingSkills.length
    });

    return {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalToggledSkills: toggledRoleSkills.length
    };
  }

  calculateMatchPercentages(
    matchingCount: number,
    competencyCount: number,
    skillGoalCount: number,
    totalCount: number
  ) {
    console.log('BenchmarkCalculator: Calculating percentages:', {
      matchingCount,
      competencyCount,
      skillGoalCount,
      totalCount
    });

    const skillMatchPercentage = Math.round((matchingCount / totalCount) * 100);
    const competencyMatchPercentage = Math.round((competencyCount / totalCount) * 100);
    const skillGoalMatchPercentage = Math.round((skillGoalCount / totalCount) * 100);
    const averagePercentage = Math.round(
      (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
    );

    return {
      skillMatchPercentage,
      competencyMatchPercentage,
      skillGoalMatchPercentage,
      averagePercentage
    };
  }
}