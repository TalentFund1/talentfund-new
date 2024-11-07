import { Check, Heart, Circle } from "lucide-react";

export const getRequirementStyles = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return 'bg-background border border-border text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1';
    case 'preferred':
      return 'bg-background/50 border border-border/60 text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1';
    default:
      return 'bg-background/50 border border-border/60 text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1';
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return <Check className="h-3 w-3" />;
    case 'preferred':
      return <Heart className="h-3 w-3" />;
    default:
      return <Circle className="h-3 w-3" />;
  }
};

export const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 'bg-primary-accent/10 text-[#1f2144] font-medium px-2.5 py-1 rounded-t-md text-sm w-full capitalize';
    case 'intermediate':
      return 'bg-primary-icon/10 text-[#1f2144] font-medium px-2.5 py-1 rounded-t-md text-sm w-full capitalize';
    case 'beginner':
      return 'bg-[#008000]/10 text-[#1f2144] font-medium px-2.5 py-1 rounded-t-md text-sm w-full capitalize';
    case 'unspecified':
      return 'bg-gray-100 text-[#1f2144] font-medium px-2.5 py-1 rounded-t-md text-sm w-full capitalize';
    default:
      return 'bg-gray-100 text-[#1f2144] font-medium px-2.5 py-1 rounded-t-md text-sm w-full capitalize';
  }
};