import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";
import { benchmarkingService } from "../../../services/benchmarking";

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

    const matchingSkills = this.calculateMatchingSkills(
      toggledRoleSkills,
      employeeSkills
    );

    const competencyMatchingSkills = this.calculateCompetencyMatches(
      matchingSkills,
      comparisonLevel,
      selectedRole,
      getSkillState,
      employeeId
    );

    const skillGoalMatchingSkills = this.calculateSkillGoalMatches(
      matchingSkills,
      getSkillState,
      employeeId
    );

    const totalToggledSkills = toggledRoleSkills.length;

    const {
      skillMatchPercentage,
      competencyMatchPercentage,
      skillGoalMatchPercentage,
      averagePercentage
    } = this.calculatePercentages(
      matchingSkills.length,
      competencyMatchingSkills.length,
      skillGoalMatchingSkills.length,
      totalToggledSkills
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

  private calculateMatchingSkills(
    toggledRoleSkills: UnifiedSkill[],
    employeeSkills: UnifiedSkill[]
  ): UnifiedSkill[] {
    return toggledRoleSkills.filter(roleSkill =>
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );
  }

  private calculateCompetencyMatches(
    matchingSkills: UnifiedSkill[],
    comparisonLevel: string,
    selectedRole: string,
    getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData,
    employeeId: string
  ): UnifiedSkill[] {
    return matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      const employeeSkillLevel = skillState?.level || 'unspecified';
      const roleSkillLevel = skill.roleLevel || 'unspecified';

      console.log('Comparing competency levels:', {
        skill: skill.title,
        employeeLevel: employeeSkillLevel,
        roleLevel: roleSkillLevel
      });

      const comparison = benchmarkingService.compareSkillLevels(
        { title: skill.title, level: employeeSkillLevel },
        { title: skill.title, minimumLevel: roleSkillLevel }
      );

      return comparison.matchPercentage >= 100;
    });
  }

  private calculateSkillGoalMatches(
    matchingSkills: UnifiedSkill[],
    getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData,
    employeeId: string
  ): UnifiedSkill[] {
    return matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
    });
  }

  private calculatePercentages(
    matchingSkillsCount: number,
    competencyMatchCount: number,
    skillGoalMatchCount: number,
    totalSkills: number
  ) {
    const calculatePercentage = (count: number) => 
      totalSkills > 0 ? Math.round((count / totalSkills) * 100) : 0;

    const skillMatchPercentage = calculatePercentage(matchingSkillsCount);
    const competencyMatchPercentage = calculatePercentage(competencyMatchCount);
    const skillGoalMatchPercentage = calculatePercentage(skillGoalMatchCount);
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

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();