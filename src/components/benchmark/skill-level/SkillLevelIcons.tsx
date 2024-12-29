import { Star, Shield, Target, CircleDashed, Heart, X, CircleHelp } from "lucide-react";

export const getLevelIcon = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return <Star className="w-3.5 h-3.5 text-primary-accent" />;
    case 'intermediate':
      return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
    case 'beginner':
      return <Target className="w-3.5 h-3.5 text-[#008000]" />;
    default:
      return <CircleHelp className="w-3.5 h-3.5 text-gray-400" />;
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement) {
    case 'required':
      return <Heart className="w-3.5 h-3.5" />;
    case 'not_interested':
      return <X className="w-3.5 h-3.5" />;
    case 'unknown':
      return <CircleHelp className="w-3.5 h-3.5" />;
    default:
      return <Heart className="w-3.5 h-3.5" />;
  }
};