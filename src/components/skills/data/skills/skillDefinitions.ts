import { UnifiedSkill } from '../../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { backendSkills } from './categories/backendSkills';
import { devopsSkills } from './categories/devopsSkills';
import { softSkills } from './categories/softSkills';
import { certificationSkills } from './categories/certificationSkills';

export const defineSkills = (): UnifiedSkill[] => {
  console.log('Defining skills with updated categories');
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...devopsSkills,
    ...softSkills,
    ...certificationSkills
  ];

  console.log('Defined skills by category:', {
    ai: aiSkills.length,
    backend: backendSkills.length,
    devops: devopsSkills.length,
    soft: softSkills.length,
    certification: certificationSkills.length,
    total: allSkills.length
  });

  return allSkills;
};