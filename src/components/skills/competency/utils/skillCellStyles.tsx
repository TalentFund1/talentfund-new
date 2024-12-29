import { Star, Shield, Target, CircleDashed, Heart, X } from "lucide-react";

export const getLevelIcon = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return <Star className="w-4 h-4 text-primary-accent" />;
    case 'intermediate':
      return <Shield className="w-4 h-4 text-primary-icon" />;
    case 'beginner':
      return <Target className="w-4 h-4 text-[#008000]" />;
    default:
      return <CircleDashed className="w-4 h-4 text-gray-400" />;
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement?.toLowerCase()) {
    case 'required':
      return <Heart className="w-3.5 h-3.5" />;
    case 'not-interested':
      return <X className="w-3.5 h-3.5" />;
    default:
      return <CircleDashed className="w-3.5 h-3.5" />;
  }
};

export const getLevelStyles = (level: string) => {
  const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]';

  switch (level?.toLowerCase()) {
    case 'advanced':
      return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
    case 'intermediate':
      return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
    case 'beginner':
      return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
    default:
      return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
  }
};

export const getRequirementStyles = (requirement: string, level: string) => {
  const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 rounded-b-md';
  
  switch (requirement?.toLowerCase()) {
    case 'required':
      return `${baseStyles} ${
        level.toLowerCase() === 'advanced' 
          ? 'bg-primary-accent/20 border-primary-accent' 
          : level.toLowerCase() === 'intermediate'
            ? 'bg-primary-icon/20 border-primary-icon'
            : level.toLowerCase() === 'beginner'
              ? 'bg-[#008000]/20 border-[#008000]'
              : 'bg-gray-100 border-gray-300'
      }`;
    case 'not-interested':
    case 'unknown':
    default:
      return `${baseStyles} bg-gray-100 border-gray-300`;
  }
};