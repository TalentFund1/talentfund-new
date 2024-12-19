import { Star, Shield, Target, CircleDashed, Check, X, Heart } from "lucide-react";
import { SkillRequirement } from "../../skills/types/SkillTypes";

export const getLevelIcon = (level: string = 'unspecified') => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return <Star className="w-3.5 h-3.5 text-primary-accent" />;
    case 'intermediate':
      return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
    case 'beginner':
      return <Target className="w-3.5 h-3.5 text-[#008000]" />;
    default:
      return <CircleDashed className="w-3.5 h-3.5 text-gray-400" />;
  }
};

export const getRequirementIcon = (requirement: SkillRequirement) => {
  switch (requirement) {
    case 'required':
      return <Check className="w-3.5 h-3.5" />;
    case 'not_interested':
      return <X className="w-3.5 h-3.5" />;
    case 'skill_goal':
      return <Heart className="w-3.5 h-3.5" />;
    default:
      return <CircleDashed className="w-3.5 h-3.5" />;
  }
};

export const getBorderColorClass = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return 'border-primary-accent bg-primary-accent/10';
    case 'intermediate':
      return 'border-primary-icon bg-primary-icon/10';
    case 'beginner':
      return 'border-[#008000] bg-[#008000]/10';
    default:
      return 'border-gray-400 bg-gray-100/50';
  }
};

export const getLowerBorderColorClass = (level: string, requirement: SkillRequirement) => {
  if (requirement !== 'required' && requirement !== 'skill_goal') {
    return 'border-[#e5e7eb]';
  }
  return getBorderColorClass(level).split(' ')[0];
};