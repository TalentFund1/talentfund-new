import { UnifiedSkill } from './skills/types/SkillTypes';
import { 
  getAllSkills,
  getTechnicalSkills,
  getSoftSkills,
  technicalSkillTitles,
  softSkillTitles
} from './skills/data/centralSkillsDatabase';

// Export all the necessary data from the central database
export const technicalSkillsList = getTechnicalSkills();
export const softSkillsList = getSoftSkills();

// Export skill titles for backward compatibility
export const technicalSkills = technicalSkillTitles;
export const softSkills = softSkillTitles;

// Export full skill objects
export const technicalSkillObjects = technicalSkillsList;
export const softSkillObjects = softSkillsList;

console.log('Skills loaded:', {
  total: getAllSkills().length,
  technical: technicalSkills.length,
  soft: softSkills.length
});