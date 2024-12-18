import { UnifiedSkill } from '../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { webSkills } from './categories/webSkills';
import { devopsSkills } from './categories/devopsSkills';
import { normalizeSkillTitle } from '../utils/normalization';

// Combine all skills with normalized titles
const skills: UnifiedSkill[] = [
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
].map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Helper function to get unique skills by title
const getUniqueSkills = (skillsArray: UnifiedSkill[]) => {
  const seen = new Set();
  return skillsArray.filter(skill => {
    if (!skill?.title) {
      console.warn('Invalid skill detected:', skill);
      return false;
    }
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
  soft: softSkills.length,
  byCategory: {
    ai: aiSkills.length,
    web: webSkills.length,
    devops: devopsSkills.length
  }
});

// Export the complete skills array with validation
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills, total count:', skills.length);
  return getUniqueSkills(skills);
};

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  return skills.find(skill => skill.id === id);
};

// Helper function to find a skill by title
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const normalizedTitle = normalizeSkillTitle(title);
  return skills.find(skill => normalizeSkillTitle(skill.title) === normalizedTitle);
};