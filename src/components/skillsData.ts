import { technicalSkills as importedTechnicalSkills } from './skills/data/categories/technicalSkills';
import { aiSkills } from './skills/data/categories/aiSkills';
import { softSkills as importedSoftSkills } from './skills/data/categories/softSkills';
import { UnifiedSkill } from './skills/types/SkillTypes';
import { normalizeSkillTitle } from './skills/data/centralSkillsDatabase';

// Combine all skills with normalized titles
const skills: UnifiedSkill[] = [
  ...importedTechnicalSkills,
  ...aiSkills,
  ...importedSoftSkills
].map(skill => ({
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

// Categorize skills into technical and soft skills
export const technicalSkillsList = getUniqueSkills(skills.filter(skill => 
  skill.category === 'specialized' && skill.weight === 'technical'
));

export const softSkillsList = getUniqueSkills(skills.filter(skill => 
  skill.category === 'common' && skill.weight === 'necessary'
));

// Export skill titles for backward compatibility
export const technicalSkills = technicalSkillsList.map(skill => skill.title);
export const softSkills = softSkillsList.map(skill => skill.title);

// Export full skill objects
export const technicalSkillObjects = technicalSkillsList;
export const softSkillObjects = softSkillsList;

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});