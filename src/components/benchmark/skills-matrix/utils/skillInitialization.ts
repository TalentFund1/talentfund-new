import { UnifiedSkill } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../../skills/utils/normalization';
import { getSkillCategory } from '../../../skills/data/skills/categories/skillCategories';

export const initializeEmployeeSkills = (employeeId: string, skills: UnifiedSkill[]) => {
  console.log('Initializing skills for employee:', employeeId);
  
  const validatedSkills = skills.map(skill => {
    const normalizedTitle = normalizeSkillTitle(skill.title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'unspecified',
      requirement: 'unknown'
    };
  });

  console.log('Initialized employee skills:', {
    employeeId,
    totalSkills: validatedSkills.length,
    sampleSkills: validatedSkills.slice(0, 5).map(s => s.title)
  });

  return validatedSkills;
};