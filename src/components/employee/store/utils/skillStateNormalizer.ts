import { SkillGoalStatus } from "../../types/employeeSkillTypes";

export const normalizeGoalStatus = (status: string): SkillGoalStatus => {
  console.log('Normalizing goal status:', status);
  
  // Convert legacy values to new format
  if (status === 'required' || status === 'preferred') {
    console.log('Converting legacy status to skill_goal:', status);
    return 'skill_goal';
  }
  
  // Ensure the status is a valid SkillGoalStatus
  const validStatuses: SkillGoalStatus[] = ['skill_goal', 'not_interested', 'unknown'];
  const normalizedStatus = status.toLowerCase() as SkillGoalStatus;
  
  if (validStatuses.includes(normalizedStatus)) {
    return normalizedStatus;
  }
  
  console.log('Invalid status, defaulting to unknown:', status);
  return 'unknown';
};