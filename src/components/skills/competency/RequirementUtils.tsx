import { Heart } from "lucide-react";

export const getRequirementStyles = (requirement: string, level: string) => {
  const borderColor = level.toLowerCase() === 'advanced' 
    ? 'border-primary-accent'
    : level.toLowerCase() === 'intermediate'
      ? 'border-primary-icon'
      : level.toLowerCase() === 'beginner'
        ? 'border-[#008000]'
        : 'border-gray-300';

  if (!requirement || requirement === '-') {
    return 'invisible h-[22px]';
  }

  const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
  
  switch (requirement.toLowerCase()) {
    case 'required':
      return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
    case 'preferred':
      return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    case 'unspecified':
      return `${baseStyles} bg-transparent border-x border-b rounded-b-md border-gray-200`;
    default:
      return `${baseStyles} bg-transparent`;
  }
};

export const getLevelStyles = (level: string) => {
  if (!level || level === '-') {
    return 'text-gray-300 text-sm font-medium h-[26px] flex items-center justify-center';
  }

  const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144] border-0';

  switch (level.toLowerCase()) {
    case 'advanced':
      return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
    case 'intermediate':
      return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
    case 'beginner':
      return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
    default:
      return `${baseStyles} border-2 border-gray-300 text-gray-400`;
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return '✓';
    case 'preferred':
      return <Heart className="w-3 h-3" />;
    case 'unspecified':
      return '−';
    default:
      return '';
  }
};