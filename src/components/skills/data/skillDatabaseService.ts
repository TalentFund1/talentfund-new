import { Skill, SkillWeight, SkillCategory } from '../types/SkillTypes';
import { Skills, getAllSkills } from './skills/allSkills';
import { getSkillGrowth, getSkillSalary } from './utils/metrics';

// Helper function to determine skill weight based on growth and category
const determineWeight = (growth: string, category: string): SkillWeight => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (category === 'specialized' || category === 'common') return 'technical';
  return 'necessary';
};

// Helper function to determine business category
const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    'AWS': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Machine Learning': 'Information Technology',
    'React': 'Information Technology',
    'Node.js': 'Information Technology',
    'Communication': 'Media and Communications',
    'Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Data Science': 'Analysis',
    'Risk Management': 'Risk and Compliance',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Initiative and Leadership',
    'Technical Writing': 'Media and Communications',
    'Strategic Planning': 'Initiative and Leadership'
  };
  
  return categories[skillTitle] || 'Information Technology';
};

// Use the consolidated skills directly
export const skillsDatabase = getAllSkills().map(skill => ({
  ...skill,
  growth: skill.growth || getSkillGrowth(skill.title),
  salary: skill.salary || getSkillSalary(skill.title),
  businessCategory: skill.businessCategory || getBusinessCategory(skill.title)
}));

console.log('Initialized skills database with complete metadata:', {
  totalSkills: skillsDatabase.length,
  withGrowth: skillsDatabase.filter(s => s.growth).length,
  withSalary: skillsDatabase.filter(s => s.salary).length,
  categories: skillsDatabase.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
});

// Helper functions
export const getSkillByTitle = (title: string): Skill | undefined => {
  const skill = skillsDatabase.find(skill => skill.title === title);
  if (skill) {
    console.log('Found skill by title:', { title, skill });
  } else {
    console.warn('Skill not found:', title);
  }
  return skill;
};

export const getSkillsByWeight = (weight: SkillWeight): Skill[] => {
  return skillsDatabase.filter(skill => skill.weight === weight);
};

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

// Add the missing function
export const addSkillToInitialSkills = (employeeId: string, skill: Skill): void => {
  console.log('Adding skill to employee:', { employeeId, skill });
  // The actual implementation will be handled by the skills database
  // This is just a pass-through function that logs the operation
};