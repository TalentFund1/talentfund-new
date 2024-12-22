import { SkillCategory } from '../../../types/SkillTypes';
import { getAllSkills } from '../allSkills';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  const skill = getAllSkills().find(s => s.title === skillTitle);
  if (skill) {
    console.log(`Found skill ${skillTitle} in universal database with category:`, skill.category);
    return skill.category;
  }
  
  console.log(`Skill ${skillTitle} not found in universal database, defaulting to common`);
  return 'common';
};

// Export for external use
export { getAllSkills };

console.log('Skill categories initialized using universal database');