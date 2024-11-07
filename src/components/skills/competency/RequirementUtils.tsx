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
      return `${baseStyles} bg-gray-100/90 border-x border-b rounded-b-md ${borderColor}`;
    case 'preferred':
      return `${baseStyles} bg-gray-50/90 border-x border-b rounded-b-md border-gray-300`;
    case 'unspecified':
      return `${baseStyles} bg-gray-50/50 border-x border-b rounded-b-md border-gray-200`;
    default:
      return `${baseStyles} bg-transparent`;
  }
};

export const getLevelStyles = (level: string) => {
  if (!level || level === '-') {
    return 'text-gray-300 text-sm font-medium h-[26px] flex items-center justify-center';
  }

  const baseStyles = 'border-2 rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]';

  switch (level.toLowerCase()) {
    case 'advanced':
      return `${baseStyles} border-primary-accent bg-primary-accent/10`;
    case 'intermediate':
      return `${baseStyles} border-primary-icon bg-primary-icon/10`;
    case 'beginner':
      return `${baseStyles} border-[#008000] bg-[#008000]/10`;
    default:
      return `${baseStyles} border-gray-300 text-gray-400`;
  }
};

export const getRequirementIcon = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return '✓';
    case 'preferred':
      return '○';
    case 'unspecified':
      return '−';
    default:
      return '';
  }
};