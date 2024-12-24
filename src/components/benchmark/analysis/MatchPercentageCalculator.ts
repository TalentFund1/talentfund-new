interface MatchPercentages {
  skillMatchPercentage: number;
  competencyMatchPercentage: number;
  skillGoalMatchPercentage: number;
  averagePercentage: number;
}

export const calculateMatchPercentages = (
  matchingSkillsCount: number,
  competencyMatchCount: number,
  skillGoalMatchCount: number,
  totalToggledSkills: number
): MatchPercentages => {
  console.log('Calculating match percentages:', {
    matchingSkills: matchingSkillsCount,
    competencyMatch: competencyMatchCount,
    skillGoalMatch: skillGoalMatchCount,
    total: totalToggledSkills
  });

  const skillMatchPercentage = totalToggledSkills > 0 
    ? (matchingSkillsCount / totalToggledSkills) * 100 
    : 0;

  const competencyMatchPercentage = totalToggledSkills > 0 
    ? (competencyMatchCount / totalToggledSkills) * 100 
    : 0;

  const skillGoalMatchPercentage = totalToggledSkills > 0 
    ? (skillGoalMatchCount / totalToggledSkills) * 100 
    : 0;

  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  return {
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  };
};