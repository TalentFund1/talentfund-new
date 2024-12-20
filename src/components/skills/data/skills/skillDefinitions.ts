import { UnifiedSkill } from '../../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { developmentSkills } from './categories/developmentSkills';
import { devOpsSkills } from './categories/devOpsSkills';
import { frontendSkills } from './categories/frontendSkills';
import { softSkills } from './categories/softSkills';
import { certificationSkills } from './categories/certificationSkills';

export const defineSkills = (): UnifiedSkill[] => {
  console.log('Defining skills from universal database');
  
  const allSkills = [
    ...aiSkills,
    ...developmentSkills,
    ...devOpsSkills,
    ...frontendSkills,
    ...softSkills,
    ...certificationSkills
  ];

  console.log('Skills loaded:', {
    total: allSkills.length,
    byCategory: {
      specialized: allSkills.filter(s => s.category === 'specialized').length,
      common: allSkills.filter(s => s.category === 'common').length,
      certification: allSkills.filter(s => s.category === 'certification').length
    }
  });

  return allSkills;
};