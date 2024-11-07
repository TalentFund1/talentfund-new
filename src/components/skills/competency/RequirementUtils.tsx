export const getRequirementStyles = (requirement: string, level: string) => {
  const borderColor = level.toLowerCase() === 'advanced' 
    ? 'border-primary-accent'
    : level.toLowerCase() === 'intermediate'
      ? 'border-primary-icon'
      : level.toLowerCase() === 'beginner'
        ? 'border-[#008000]'
        : 'border-gray-300';

  switch (requirement.toLowerCase()) {
    case 'required':
      return `bg-gray-100 border-x border-b ${borderColor} text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1`;
    case 'preferred':
      return 'bg-gray-100 text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1';
    default:
      return 'bg-gray-100 text-xs px-2 py-0.5 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1';
  }
};

export const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 'border-2 border-primary-accent rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full capitalize';
    case 'intermediate':
      return 'border-2 border-primary-icon rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full capitalize';
    case 'beginner':
      return 'border-2 border-[#008000] rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full capitalize';
    default:
      return 'border-2 border-gray-300 rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full capitalize';
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return '✓';
    case 'preferred':
      return '♡';
    default:
      return '○';
  }
};