import { UnifiedSkill } from '../../../types/SkillTypes';
import { universalSkillsDatabase } from '../universalSkillsDatabase';

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log('Getting skills for category:', category);
  return universalSkillsDatabase.filter(skill => skill.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(universalSkillsDatabase.map(skill => skill.category));
  return Array.from(categories);
};

export const getCategoryForSkill = (skillTitle: string): string | undefined => {
  const skill = universalSkillsDatabase.find(s => s.title === skillTitle);
  return skill?.category;
};