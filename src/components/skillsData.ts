import { Skills, getAllSkills } from './skills/data/skills/allSkills';
import { UnifiedSkill } from './skills/types/SkillTypes';
import { normalizeSkillTitle } from './skills/utils/normalization';

// Combine all skills with normalized titles
const skills: UnifiedSkill[] = getAllSkills().map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Helper function to get unique skills by title
const getUniqueSkills = (skillsArray: UnifiedSkill[]) => {
  const seen = new Set();
  return skillsArray.filter(skill => {
    const normalizedTitle = normalizeSkillTitle(skill.title);
    const duplicate = seen.has(normalizedTitle);
    seen.add(normalizedTitle);
    return !duplicate;
  });
};

// Get all unique skills without filtering by category
export const allSkillsList = getUniqueSkills(skills);

// Export skill titles for backward compatibility
export const technicalSkills = allSkillsList.map(skill => skill.title);
export const softSkills = allSkillsList.map(skill => skill.title);

// Export full skill objects
export const technicalSkillObjects = allSkillsList;
export const softSkillObjects = allSkillsList;
export const allSkillObjects = allSkillsList;

console.log('Loaded skills:', {
  total: skills.length,
  allUnique: allSkillsList.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});