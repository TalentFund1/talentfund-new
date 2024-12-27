import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";
import { calculateMatchPercentages } from "./MatchPercentageCalculator";

class UnifiedBenchmarkCalculator {
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
  ) {
    console.log('Starting benchmark calculation:', {
      toggledSkillsCount: toggledRoleSkills.length,
      employeeSkillsCount: employeeSkills.length,
      comparisonLevel,
      selectedRole,
      track
    });

    const matchingSkills = toggledRoleSkills.filter(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      return employeeSkill !== undefined;
    });

    console.log('Found matching skills:', matchingSkills.map(s => s.title));

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      const employeeLevel = (skillState?.level || 'unspecified').toLowerCase();
      const employeeLevelValue = this.LEVEL_VALUES[employeeLevel] || 1;
      
      console.log('Competency comparison for skill:', {
        skill: skill.title,
        employeeLevel,
        employeeLevelValue,
        hasSkill: true
      });

      // If employee has the skill, count it as a competency match
      return employeeLevel !== 'unspecified';
    });

    console.log('Competency matching skills:', competencyMatchingSkills.map(s => s.title));

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = toggledRoleSkills.length;

    const {
      skillMatchPercentage,
      competencyMatchPercentage,
      skillGoalMatchPercentage,
      averagePercentage
    } = calculateMatchPercentages(
      matchingSkills.length,
      competencyMatchingSkills.length,
      skillGoalMatchingSkills.length,
      totalToggledSkills
    );

    console.log('Benchmark calculation complete:', {
      totalToggled: totalToggledSkills,
      skillMatch: { count: matchingSkills.length, percentage: skillMatchPercentage },
      competencyMatch: { count: competencyMatchingSkills.length, percentage: competencyMatchPercentage },
      skillGoalMatch: { count: skillGoalMatchingSkills.length, percentage: skillGoalMatchPercentage },
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