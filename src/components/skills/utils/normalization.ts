export const normalizeSkillTitle = (title: string): string => {
  if (title.toLowerCase().includes('certification') || 
      title.toLowerCase().includes('certificate')) {
    return title.replace(/certificate/i, 'Certification')
               .replace(/certified/i, 'Certification');
  }
  return title;
};