export const getLowerBorderColorClass = (level: string, requirement?: string) => {
  if (requirement !== 'required' && requirement !== 'skill_goal') {
    return 'border-[#e5e7eb]';
  }
  return getBorderColorClass(level).split(' ')[0];
};

export const getBorderColorClass = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return 'border-primary-accent bg-primary-accent/10';
    case 'intermediate':
      return 'border-primary-icon bg-primary-icon/10';
    case 'beginner':
      return 'border-[#008000] bg-[#008000]/10';
    default:
      return 'border-gray-400 bg-gray-100/50';
  }
};