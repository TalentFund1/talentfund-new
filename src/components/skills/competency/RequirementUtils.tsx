export const getRequirementStyles = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return 'bg-white border-2 border-primary-accent text-xs px-2 py-0.5 rounded-b-md font-medium text-primary-accent w-full -mt-[1px] flex items-center justify-center gap-1';
    case 'preferred':
      return 'bg-white border-2 border-primary-icon text-xs px-2 py-0.5 rounded-b-md font-medium text-primary-icon w-full -mt-[1px] flex items-center justify-center gap-1';
    default:
      return 'bg-white border border-border/60 text-xs px-2 py-0.5 rounded-b-md font-medium text-muted-foreground w-full -mt-[1px] flex items-center justify-center gap-1';
  }
};

export const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 'border-2 border-primary-accent rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full';
    case 'intermediate':
      return 'border-2 border-primary-icon rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full';
    case 'beginner':
      return 'border-2 border-[#008000] rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full';
    default:
      return 'border-2 border-gray-300 rounded-t-md px-2 py-1 text-xs font-medium text-[#1f2144] w-full';
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