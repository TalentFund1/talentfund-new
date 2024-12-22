import { UnifiedSkill } from '../../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { developmentSkills } from './categories/developmentSkills';
import { frontendSkills } from './categories/frontendSkills';
import { softSkills } from './categories/softSkills';
import { certificationSkills } from './categories/certificationSkills';

export const skillDefinitions: UnifiedSkill[] = [
  ...aiSkills,
  ...developmentSkills,
  ...frontendSkills,
  ...softSkills,
  ...certificationSkills
];

console.log('Initialized universal skills database:', {
  totalSkills: skillDefinitions.length,
  categories: {
    ai: aiSkills.length,
    development: developmentSkills.length,
    frontend: frontendSkills.length,
    soft: softSkills.length,
    certification: certificationSkills.length
  }
});