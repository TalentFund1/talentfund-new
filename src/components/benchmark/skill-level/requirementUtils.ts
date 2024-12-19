import { SkillRequirement } from "../../skills/types/SkillTypes";

export const validateRequirement = (req: string): SkillRequirement => {
  switch (req) {
    case 'required':
      return 'required';
    case 'not_interested':
      return 'not_interested';
    case 'skill_goal':
      return 'skill_goal';
    case 'unknown':
      return 'unknown';
    case 'preferred':
      return 'preferred';
    default:
      return 'unknown';
  }
};

export const getRequirementLabel = (requirement: SkillRequirement): string => {
  switch (requirement) {
    case 'required':
    case 'skill_goal':
      return 'Skill Goal';
    case 'not_interested':
      return 'Not Interested';
    case 'unknown':
      return 'Unknown';
    case 'preferred':
      return 'Preferred';
    default:
      return 'Skill Goal';
  }
};