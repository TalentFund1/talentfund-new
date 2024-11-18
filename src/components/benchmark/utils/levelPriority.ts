export const getRoleLevelPriority = (level: string) => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
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