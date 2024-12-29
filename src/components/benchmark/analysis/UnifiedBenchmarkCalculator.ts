import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";

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

    // Basic skill match - employee has the skill
    const matchingSkills = toggledRoleSkills.filter(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      return employeeSkill !== undefined;
    });

    console.log('Found matching skills:', matchingSkills.map(s => s.title));

    // Competency match - employee has the skill at required level or higher
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

      // Only count skills that have a defined level
      return employeeLevel !== 'unspecified';
    });

    console.log('Competency matching skills:', competencyMatchingSkills.map(s => s.title));

    // Skill goal match - employee has set this as a goal
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = Math.max(toggledRoleSkills.length, 1); // Prevent division by zero

    // Calculate individual percentages with proper normalization
    const skillMatchPercentage = Math.min(
      (matchingSkills.length / totalToggledSkills) * 100,
      100
    );

    const competencyMatchPercentage = Math.min(
      (competencyMatchingSkills.length / totalToggledSkills) * 100,
      100
    );

    const skillGoalMatchPercentage = Math.min(
      (skillGoalMatchingSkills.length / totalToggledSkills) * 100,
      100
    );

    // Calculate average percentage, ensuring it doesn't exceed 100%
    const averagePercentage = Math.min(
      (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3,
      100
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