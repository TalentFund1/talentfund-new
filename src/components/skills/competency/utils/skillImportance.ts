import { SkillLevel, Track } from '../../types/sharedSkillTypes';

export const getLevelImportance = (level: SkillLevel = 'unspecified'): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] || 1;
};

export const getSkillImportance = (
  skillName: string,
  category: string,
  track: Track,
  roleId: string
): number => {
  // Base importance starts at 2 (beginner level)
  let importance = 2;

  // Adjust importance based on track
  if (track === "Managerial") {
    importance += 1; // Higher base importance for managerial track
  }

  // Adjust importance based on category
  if (category === "specialized") {
    importance += 1;
  }

  console.log('Calculated skill importance:', {
    skillName,
    category,
    track,
    roleId,
    importance
  });

  return importance;
};