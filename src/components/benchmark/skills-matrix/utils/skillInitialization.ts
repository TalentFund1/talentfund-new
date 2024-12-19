import { UnifiedSkill } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../../skills/utils/normalization';
import { getSkillCategory } from '../../../skills/data/skills/categories/skillCategories';

export const initializeEmployeeSkills = (employeeId: string, skills: string[]) => {
  console.log('Initializing skills for employee:', employeeId, skills);
  
  const validatedSkills = skills.map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  });

  console.log('Initialized employee skills:', {
    employeeId,
    totalSkills: validatedSkills.length,
  });

  return validatedSkills;
};