import { Skills, getAllSkills as getAllSkillsFromSource } from './skills/allSkills';
import { UnifiedSkill } from '../types/SkillTypes';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';
import { getSkillGrowth, getSkillSalary } from './utils/metrics';

// Get all skills and normalize their titles
const skills: UnifiedSkill[] = getAllSkillsFromSource().map(skill => {
  const normalizedTitle = normalizeSkillTitle(skill.title);
  return {
    ...skill,
    title: normalizedTitle,
    category: getSkillCategory(normalizedTitle),
    growth: skill.growth || getSkillGrowth(normalizedTitle),
    salary: skill.salary || getSkillSalary(normalizedTitle)
  };
});

console.log('Normalized skills with metrics:', skills.map(s => ({
  title: s.title,
  growth: s.growth,
  salary: s.salary
})));

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

// Export skill titles and objects by category
export const technicalSkills = allSkillsList
  .filter(skill => skill.category === 'specialized')
  .map(skill => skill.title);

export const softSkills = allSkillsList
  .filter(skill => skill.category === 'common')
  .map(skill => skill.title);

export const certificationSkills = allSkillsList
  .filter(skill => skill.category === 'certification')
  .map(skill => skill.title);

export const technicalSkillObjects = allSkillsList.filter(skill => skill.category === 'specialized');
export const softSkillObjects = allSkillsList.filter(skill => skill.category === 'common');
export const certificationSkillObjects = allSkillsList.filter(skill => skill.category === 'certification');
export const allSkillObjects = allSkillsList;

// Export the complete skills array
export const getAllSkills = (): UnifiedSkill[] => skills;

console.log('Loaded skills:', {
  total: skills.length,
  allUnique: allSkillsList.length,
  technical: technicalSkills.length,
  soft: softSkills.length,
  certification: certificationSkills.length,
  categories: {
    specialized: technicalSkillObjects.length,
    common: softSkillObjects.length,
    certification: certificationSkillObjects.length
  }
});