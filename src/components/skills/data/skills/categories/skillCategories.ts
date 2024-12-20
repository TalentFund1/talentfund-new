import { UnifiedSkill, SkillCategory } from '../../../types/SkillTypes';
import { getAllSkills } from '../allSkills';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  
  const skill = getAllSkills().find(s => s.title === skillTitle);
  
  if (!skill) {
    console.error(`Skill "${skillTitle}" not found in universal database`);
    throw new Error(`Skill "${skillTitle}" not found in universal database`);
  }
  
  console.log('Skill category result:', { skill: skillTitle, category: skill.category });
  return skill.category;
};