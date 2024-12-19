export const normalizeSkillTitle = (title: string): string => {
  if (!title) return '';
  
  // Remove extra spaces, convert to lowercase, and trim
  const normalized = title.toLowerCase().trim().replace(/\s+/g, ' ');
  
  console.log('Normalizing skill title:', {
    original: title,
    normalized: normalized
  });
  
  return normalized;
};

// Helper function to check if two skill titles are equivalent
export const areSkillTitlesEqual = (title1: string, title2: string): boolean => {
  return normalizeSkillTitle(title1) === normalizeSkillTitle(title2);
};