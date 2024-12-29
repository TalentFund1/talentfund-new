import { Heart } from "lucide-react";

export const getRequirementStyles = (requirement: string, level: string) => {
  const getBorderColor = (level: string, isRequired: boolean) => {
    if (isRequired) {
      return level.toLowerCase() === 'advanced' 
        ? 'border-primary-accent'
        : level.toLowerCase() === 'intermediate'
          ? 'border-primary-icon'
          : level.toLowerCase() === 'beginner'
            ? 'border-[#008000]'
            : 'border-gray-400'; // Darker border for required + unspecified
    }
    return 'border-gray-300'; // Light border for preferred
  };

  if (!requirement || requirement === '-') {
    return 'invisible h-[22px]';
  }

  const baseStyles = 'text-xs px-2 py-1.5 font-medium w-full flex items-center justify-center gap-1.5';
  const isRequired = requirement.toLowerCase() === 'required';
  const borderColor = getBorderColor(level, isRequired);
  
  switch (requirement.toLowerCase()) {
    case 'required':
      return `${baseStyles} bg-gray-100 border-x-2 border-b-2 rounded-b-md ${borderColor} text-[#1f2144]`;
    case 'preferred':
      return `${baseStyles} bg-gray-50 border-x border-b rounded-b-md border-gray-300 text-[#1f2144]`;
    case 'unspecified':
      return `${baseStyles} bg-white border-[0.5px] rounded-b-md border-gray-50 text-gray-400`;
    default:
      return `${baseStyles} bg-transparent`;
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