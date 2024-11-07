export const getRequirementStyles = (requirement: string, level: string) => {
  const borderColor = level.toLowerCase() === 'advanced' 
    ? 'border-primary-accent'
    : level.toLowerCase() === 'intermediate'
      ? 'border-primary-icon'
      : level.toLowerCase() === 'beginner'
        ? 'border-[#008000]'
        : 'border-gray-300';

  if (requirement.toLowerCase() === 'unspecified') {
    return `bg-gray-100/80 border-x border-b ${borderColor} text-xs px-3 py-1 rounded-b-md font-medium text-transparent w-full -mt-[1px] flex items-center justify-center gap-1.5 transition-colors hover:bg-gray-100`;
  }

  switch (requirement.toLowerCase()) {
    case 'required':
      return `bg-gray-100/80 border-x border-b ${borderColor} text-xs px-3 py-1 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1.5 transition-colors hover:bg-gray-100`;
    case 'preferred':
      return 'bg-gray-100/80 text-xs px-3 py-1 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1.5 transition-colors hover:bg-gray-100';
    default:
      return 'bg-gray-100/80 text-xs px-3 py-1 rounded-b-md font-medium text-[#1f2144] w-full -mt-[1px] flex items-center justify-center gap-1.5 transition-colors hover:bg-gray-100';
  }
};

export const getLevelStyles = (level: string) => {
  if (level.toLowerCase() === 'unspecified') {
    return 'text-xs px-3 py-1.5 font-medium text-[#1f2144] w-full capitalize';
  }

  switch (level.toLowerCase()) {
    case 'advanced':
      return 'border-2 border-primary-accent bg-primary-accent/5 rounded-md px-3 py-1.5 text-xs font-medium text-[#1f2144] w-full capitalize transition-colors hover:bg-primary-accent/10';
    case 'intermediate':
      return 'border-2 border-primary-icon bg-primary-icon/5 rounded-md px-3 py-1.5 text-xs font-medium text-[#1f2144] w-full capitalize transition-colors hover:bg-primary-icon/10';
    case 'beginner':
      return 'border-2 border-[#008000] bg-[#008000]/5 rounded-md px-3 py-1.5 text-xs font-medium text-[#1f2144] w-full capitalize transition-colors hover:bg-[#008000]/10';
    default:
      return 'border-2 border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-[#1f2144] w-full capitalize';
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return '✓';
    case 'preferred':
      return '♡';
    case 'unspecified':
      return '✓';  // Adding icon to maintain height but making it invisible with text-transparent
    default:
      return '';
  }
};