export const getLevelStyles = (level: string) => {
  const baseStyles = 'rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center gap-2 min-h-[36px] text-[#1f2144]';
  
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

export const getRequirementStyles = (level?: string) => {
  const borderColor = level?.toLowerCase() === 'advanced' 
    ? 'border-primary-accent'
    : level?.toLowerCase() === 'intermediate'
      ? 'border-primary-icon'
      : level?.toLowerCase() === 'beginner'
        ? 'border-[#008000]'
        : 'border-gray-400';

  return `text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 bg-[#F9FAFB] border-x-2 border-b-2 min-h-[32px] rounded-b-md ${borderColor}`;
};