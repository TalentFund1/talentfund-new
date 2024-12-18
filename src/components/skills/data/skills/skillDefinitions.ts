import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './categories/technicalSkills';
import { softSkills } from './categories/softSkills';
import { certificationSkills } from './categories/certificationSkills';

export const defineSkills = (): UnifiedSkill[] => {
  console.log('Defining skills with updated categories');
  
  const allSkills = [
    ...technicalSkills,
    ...softSkills,
    ...certificationSkills
  ];

  console.log('Defined skills by category:', {
    technical: technicalSkills.length,
    soft: softSkills.length,
    certification: certificationSkills.length,
    total: allSkills.length
  });

  return allSkills;
};