export type SkillCategory = 'specialized' | 'common' | 'certification';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  // Get skill from universal database
  const { getAllSkills } = require('../allSkills');
  const allSkills = getAllSkills();
  const skill = allSkills.find(s => s.title.toLowerCase() === skillTitle.toLowerCase());
  
  if (skill) {
    console.log(`Found category in universal database for ${skillTitle}:`, skill.category);
    return skill.category as SkillCategory;
  }
  
  // Default to common if not found
  console.log(`No specific category found for ${skillTitle}, defaulting to common`);
  return 'common';
};

console.log('Skill categories initialized - using universal database only');