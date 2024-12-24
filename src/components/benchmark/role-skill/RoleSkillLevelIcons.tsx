import { Star, Target, Shield, Check, Heart } from "lucide-react";

export const getLevelIcon = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return <Star className="w-3.5 h-3.5 text-primary-accent" />;
    case 'intermediate':
      return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
    case 'beginner':
      return <Target className="w-3.5 h-3.5 text-[#008000]" />;
    default:
      return null;
  }
};

export const getRequirementIcon = (isRequired: boolean) => {
  return isRequired ? (
    <Check className="w-3.5 h-3.5" />
  ) : (
    <Heart className="w-3.5 h-3.5" />
  );
};