export const normalizeSkillTitle = (title: string): string => {
  // Handle certification variations
  if (title.toLowerCase().includes('certification') || 
      title.toLowerCase().includes('certificate')) {
    return title.trim()
              .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
              .replace(/certificate/i, 'Certification')
              .replace(/certified/i, 'Certification')
              .replace(/developer certification/i, 'Developer Certificate');
  }
  return title.trim().replace(/\s+/g, ' ');
};