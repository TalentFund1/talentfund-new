export type SkillCategory = 'specialized' | 'common' | 'certification';

// Map of skills to their categories
const skillCategoryMap: { [key: string]: SkillCategory } = {
  // Specialized skills
  'Machine Learning': 'specialized',
  'Deep Learning': 'specialized',
  'Natural Language Processing': 'specialized',
  'Computer Vision': 'specialized',
  'TensorFlow': 'specialized',
  'Python': 'specialized',
  'GraphQL': 'specialized',
  'Database Design': 'specialized',
  'Next.js': 'specialized',
  'React': 'specialized',
  'Node.js': 'specialized',
  'Docker': 'specialized',
  'Kubernetes': 'specialized',
  
  // Common skills
  'Team Leadership': 'common',
  'Technical Writing': 'common',
  'Problem Solving': 'common',
  'Code Review': 'common',
  'Git Version Control': 'common',
  'Communication': 'common',
  
  // Certification skills
  'AWS Certified DevOps Engineer': 'certification',
  'AWS Certified Solutions Architect': 'certification',
  'AWS Certified Machine Learning - Specialty': 'certification',
  'Kubernetes Administrator (CKA)': 'certification',
  'TensorFlow Developer Certificate': 'certification',
  'Project Management Professional (PMP)': 'certification',
  'Certified Scrum Master (CSM)': 'certification',
  'AWS Certified Developer': 'certification',
  'AWS Certified Cloud Practitioner': 'certification',
  'Google Cloud Professional': 'certification',
  'Microsoft Azure Fundamentals': 'certification'
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  // First check if it's explicitly mapped
  if (skillCategoryMap[skillTitle]) {
    console.log(`Found explicit category mapping for ${skillTitle}:`, skillCategoryMap[skillTitle]);
    return skillCategoryMap[skillTitle];
  }
  
  // Check for certifications using comprehensive patterns
  const certificationPatterns = [
    /certified/i,
    /certification/i,
    /certificate/i,
    /\baws\b.*\b(associate|professional|specialty)\b/i,
    /\bcka\b/i,
    /\bpmp\b/i,
    /\bcsm\b/i,
    /\bazure\b.*\b(fundamentals|associate|expert)\b/i,
    /\bgcp\b/i
  ];
  
  if (certificationPatterns.some(pattern => pattern.test(skillTitle))) {
    console.log('Detected certification based on pattern:', skillTitle);
    return 'certification';
  }
  
  // Check for specialized skills patterns
  const specializedPatterns = [
    /\b(react|vue|angular|svelte)\b/i,
    /\b(node|deno|python|java|golang)\b/i,
    /\b(kubernetes|docker|terraform)\b/i,
    /\b(aws|azure|gcp)\b/i,
    /\b(ml|ai|machine learning|artificial intelligence)\b/i,
    /\b(frontend|backend|fullstack)\b/i
  ];
  
  if (specializedPatterns.some(pattern => pattern.test(skillTitle))) {
    console.log('Detected specialized skill based on pattern:', skillTitle);
    return 'specialized';
  }
  
  // Default to common if no other matches
  console.log(`No specific category found for ${skillTitle}, defaulting to common`);
  return 'common';
};

// Export for external use
export { skillCategoryMap };

console.log('Skill categories initialized with:', {
  mappedSkills: Object.keys(skillCategoryMap).length,
  categories: {
    specialized: Object.entries(skillCategoryMap).filter(([_, cat]) => cat === 'specialized').length,
    common: Object.entries(skillCategoryMap).filter(([_, cat]) => cat === 'common').length,
    certification: Object.entries(skillCategoryMap).filter(([_, cat]) => cat === 'certification').length
  }
});