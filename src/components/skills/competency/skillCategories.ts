import { UnifiedSkill } from '../types/SkillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const categorizeSkills = (skillTitles: string[], roleId: string) => {
  console.log('Categorizing skills:', {
    skillCount: skillTitles.length,
    roleId
  });

  const categorizedSkills = skillTitles.reduce((acc, skillTitle) => {
    const skillData = getUnifiedSkillData(skillTitle);
    const category = skillData.category;

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skillTitle);

    return acc;
  }, {} as Record<string, string[]>);

  console.log('Categorized skills:', categorizedSkills);
  return categorizedSkills;
};

export const getSkillCategory = (skillTitle: string): string => {
  const skillData = getUnifiedSkillData(skillTitle);
  return skillData.category;
};