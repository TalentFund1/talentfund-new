export const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return "border-2 border-primary-accent bg-primary-accent/10 rounded-t-md";
    case 'intermediate':
      return "border-2 border-primary-icon bg-primary-icon/10 rounded-t-md";
    case 'beginner':
      return "border-2 border-[#008000] bg-[#008000]/10 rounded-t-md";
    default:
      return "border-2 border-gray-400 bg-gray-100/50 rounded-t-md";
  }
};

export const getRequirementStyles = (requirement: string, level: string) => {
  const baseStyles = "text-xs px-2 py-1 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 rounded-b-md";
  
  switch (requirement) {
    case 'required':
      return `${baseStyles} bg-gray-100/90 ${getLevelBorderColor(level)}`;
    case 'interested':
      return `${baseStyles} bg-gray-50/90 border-gray-300`;
    case 'not-interested':
      return `${baseStyles} bg-white border-gray-50 text-gray-400`;
    case 'unknown':
      return `${baseStyles} bg-white border-gray-50 text-gray-400`;
    default:
      return `${baseStyles} bg-white border-gray-50 text-gray-400`;
  }
};

export const getLevelBorderColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 'border-primary-accent';
    case 'intermediate':
      return 'border-primary-icon';
    case 'beginner':
      return 'border-[#008000]';
    default:
      return 'border-gray-300';
  }
};