import { SkillsMatrixState } from "../skills-matrix/SkillsMatrixState";

export const getSkillGoalCounts = (
  allRoleSkills: any[],
  matchingSkills: any[],
  currentStates: SkillsMatrixState,
  toggledSkills: Set<string>
) => {
  // Get all skill goals (including non-matching)
  const totalSkillGoals = allRoleSkills
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;
      
      const currentSkillState = currentStates[skill.title];
      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();
      return requirement === 'required' || requirement === 'skill_goal';
    });

  // Get only matching skill goals
  const matchingSkillGoals = totalSkillGoals
    .filter(skill => 
      matchingSkills.some(matchingSkill => matchingSkill.title === skill.title)
    );

  return {
    total: totalSkillGoals.length,
    matching: matchingSkillGoals.length
  };
};