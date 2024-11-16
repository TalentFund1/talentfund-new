export const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return "bg-primary-accent/10 border-primary-accent";
    case 'intermediate':
      return "bg-primary-icon/10 border-primary-icon";
    case 'beginner':
      return "bg-[#008000]/10 border-[#008000]";
    default:
      return "bg-gray-100/50 border-gray-300";
  }
};

export const getRequirementStyles = (requirement: string, level: string) => {
  const baseStyles = "text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5";
  
  switch (requirement.toLowerCase()) {
    case 'required':
      return `${baseStyles} bg-gray-50/90`;
    case 'not-interested':
      return `${baseStyles} bg-gray-50/90 text-gray-400`;
    case 'unknown':
      return `${baseStyles} bg-gray-50/90 text-gray-400`;
    default:
      return `${baseStyles} bg-gray-50/90`;
  }
};