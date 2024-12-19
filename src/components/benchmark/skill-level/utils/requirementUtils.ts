import { SkillRequirement } from "../../../skills/types/SkillTypes";

export const validateRequirement = (req: string): SkillRequirement => {
  const validRequirements: SkillRequirement[] = ['required', 'preferred', 'skill_goal', 'not_interested', 'unknown'];
  return validRequirements.includes(req as SkillRequirement) 
    ? (req as SkillRequirement) 
    : 'unknown';
};

export const formatRequirementDisplay = (requirement: SkillRequirement): string => {
  switch (requirement) {
    case 'not_interested':
      return 'Not Interested';
    case 'skill_goal':
      return 'Skill Goal';
    default:
      return requirement.charAt(0).toUpperCase() + requirement.slice(1);
  }
};