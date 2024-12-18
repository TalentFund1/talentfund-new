import { Skills, getAllSkills as getAllSkillsFromSource } from './skills/allSkills';
import { UnifiedSkill } from '../types/SkillTypes';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillGrowth, getSkillSalary } from './utils/metrics';

// Get all skills and normalize their titles
const skills: UnifiedSkill[] = getAllSkillsFromSource().map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title),
  growth: skill.growth || getSkillGrowth(skill.title),
  salary: skill.salary || getSkillSalary(skill.title)
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

// Export skill titles and objects
export const technicalSkills = allSkillsList.map(skill => skill.title);
export const softSkills = allSkillsList.map(skill => skill.title);
export const technicalSkillObjects = allSkillsList;
export const softSkillObjects = allSkillsList;
export const allSkillObjects = allSkillsList;

// Export the complete skills array
export const getAllSkills = (): UnifiedSkill[] => skills;

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  return skills.find(skill => skill.id === id);
};

// Helper function to find a skill by title
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const normalizedTitle = normalizeSkillTitle(title);
  return skills.find(skill => normalizeSkillTitle(skill.title) === normalizedTitle);
};

console.log('Loaded skills:', {
  total: skills.length,
  allUnique: allSkillsList.length,
  technical: technicalSkills.length,
  soft: softSkills.length,
  withGrowth: skills.filter(s => s.growth).length,
  withSalary: skills.filter(s => s.salary).length
});