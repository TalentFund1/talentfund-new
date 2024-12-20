import { SkillCategory } from '../../../types/SkillTypes';
import { Skills } from '../allSkills';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  // First try to find the skill in our predefined categories
  for (const [category, skills] of Object.entries(Skills)) {
    if (skills.some(s => s.title === skillTitle)) {
      console.log('Skill category result:', { skill: skillTitle, category });
      return category as SkillCategory;
    }
  }
  
  console.error(`Skill "${skillTitle}" not found in universal database`);
  throw new Error(`Skill "${skillTitle}" not found in universal database`);
};