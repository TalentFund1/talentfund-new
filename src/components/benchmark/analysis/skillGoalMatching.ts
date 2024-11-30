export const isSkillGoalMatch = (
  employeeRequirement: string | undefined,
  roleRequired: string | undefined,
  track: string
): boolean => {
  console.log('Skill goal check:', {
    employeeRequirement,
    roleRequired,
    track
  });

  if (track === "Professional") {
    // For Professional track, only count explicit skill_goal markings
    return employeeRequirement === 'skill_goal';
  }

  // For Managerial track, count both required and skill_goal
  return employeeRequirement === 'required' || employeeRequirement === 'skill_goal';
};