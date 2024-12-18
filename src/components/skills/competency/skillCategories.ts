import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const categorizeSkills = (skills: string[], profileId: string) => {
  const categorizedSkills = skills.map(skill => getUnifiedSkillData(skill));
  
  return {
    all: skills.length,
    specialized: categorizedSkills.filter(skill => skill.category === 'specialized').length,
    common: categorizedSkills.filter(skill => skill.category === 'common').length,
    certification: categorizedSkills.filter(skill => skill.category === 'certification').length
  };
};

// Add new export for single skill categorization
export const categorizeSkill = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing skill:', skill, 'for profile:', profileId);
  const skillData = getUnifiedSkillData(skill);
  console.log(`${skill} categorized as ${skillData.category}`);
  return skillData.category;
};