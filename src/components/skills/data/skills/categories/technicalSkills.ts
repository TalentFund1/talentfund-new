import { UnifiedSkill } from '../../../types/SkillTypes';
import { aiSkills } from './aiSkills';
import { programmingSkills } from './programmingSkills';
import { devopsSkills } from './devopsSkills';

export const technicalSkills: UnifiedSkill[] = [
  ...aiSkills,
  ...programmingSkills,
  ...devopsSkills
];

console.log('Loaded technical skills:', {
  total: technicalSkills.length,
  bySubcategory: technicalSkills.reduce((acc, skill) => {
    acc[skill.subcategory] = (acc[skill.subcategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
});