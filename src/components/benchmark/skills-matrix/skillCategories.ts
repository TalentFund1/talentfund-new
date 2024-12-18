import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { Skills } from '../../skills/data/skills/allSkills';

export const filterSkillsByCategory = (skills: UnifiedSkill[], category: string) => {
  console.log('Filtering skills by category:', category);
  
  if (category === "all") {
    return skills;
  }

  return skills.filter(skill => skill.category === category.toLowerCase());
};

export const getCategoryCount = (skills: UnifiedSkill[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};

export const categorizeSkill = (skillName: string): string => {
  const skill = Skills.all.find(s => s.title === skillName);
  console.log('Categorizing skill:', { skillName, category: skill?.category || 'common' });
  return skill?.category || 'common';
};